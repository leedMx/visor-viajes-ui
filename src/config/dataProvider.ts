import {
  DataProvider,
  DeleteResult,
  fetchUtils,
  GetListParams,
  GetManyReferenceParams,
  GetManyReferenceResult,
  QueryFunctionContext,
  RaRecord,
  UpdateManyParams,
  UpdateManyResult,
} from "react-admin";
import { getCurrentToken } from "./keycloak";

const host = import.meta.env.VITE_SERVER_URL;

/**
 * Small wrapper around fetchUtils.fetchJson that:
 * - Ensures headers exist
 * - Adds Authorization: Bearer <token> from Keycloak
 */
const httpClient = (
  url: string,
  options: fetchUtils.Options = {},
) => {
  const token = getCurrentToken();
  const user = { token: `Bearer ${token}`, authenticated: !!token };
  // console.log("httpClient:", url, options, user) // devUtil
  return fetchUtils.fetchJson(url, { ...options, user });
};

export interface AppDataProvider extends DataProvider {
  logCurrentLocation: (resource: string, params: { id: number | string }) => Promise<{ data: any }>;
}

export const dataProvider: AppDataProvider = {
  getList: async (resource, params) => {
    const endpoint = buildEndpoint(params, resource);

    const { json } = await httpClient(endpoint);
    const records = (json._embedded?.[resource] ?? []).map(toRecord);
    return {
      data: records,
      total: json.page?.totalElements ?? records.length,
    };
  },

  getOne: async (resource, params) => {
    const endpoint = `${host}/${resource}/${params.id}`;
    const { json } = await httpClient(endpoint);
    return { data: toRecord(json) };
  },

  getMany: async (resource, params) => {
    const ids = (params.ids ?? []).filter(
    (id) => id !== null && id !== undefined && id !== "" && id !== "."
  );

  if (ids.length === 0) return { data: [] };

  const responses = await Promise.all(
    ids.map((id) => httpClient(`${host}/${resource}/${encodeURIComponent(String(id))}`)),
  );
  const records = responses.map((r) => toRecord(r.json));
  return { data: records };
  },

  update: async (resource, params) => {
    const endpoint = `${host}/${resource}/${params.id}`;

    const { json } = await httpClient(endpoint, {
      method: "PUT",
      body: JSON.stringify(params.data),
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    });

    return { data: toRecord(json) };
  },

  create: async (resource, params) => {
    const endpoint = `${host}/${resource}`;
    const { json } = await httpClient(endpoint, {
      method: "POST",
      body: JSON.stringify(params.data),
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    });

    return { data: toRecord(json) };
  },

  delete: async (resource, params) => {
    const endpoint = `${host}/${resource}/${params.id}`;
    await httpClient(endpoint, { method: "DELETE" });

    return { data: { id: params.id } } as DeleteResult;
  },

  deleteMany: async (resource, params) => {
    await Promise.all(
      params.ids.map((id) =>
        httpClient(`${host}/${resource}/${id}`, {
          method: "DELETE",
        }),
      ),
    );
    return { data: params.ids };
  },

  getManyReference: async function <RecordType extends RaRecord = any>(
    resource: string,
    params: GetManyReferenceParams & QueryFunctionContext,
  ): Promise<GetManyReferenceResult<RecordType>> {
    const { target, id } = params;
    params.filter = {
      [target]: id,
      search: searchMap[resource],
      ...params.filter,
    };

    const endpoint = buildEndpoint(params, resource);
    const { json } = await httpClient(endpoint);

    const records = (json._embedded?.[resource] ?? []).map(toRecord);
    const total = json.page?.totalElements ?? records.length;

    return {
      data: records as RecordType[],
      total,
    };
  },

  updateMany: function <RecordType extends RaRecord = any>(
    resource: string,
    params: UpdateManyParams,
  ): Promise<UpdateManyResult<RecordType>> {
    console.log("updateMany", resource, params);
    throw new Error("Function not implemented.");
  },

  logCurrentLocation: async (resource, params) => {
    const endpoint = `${host}/${resource}/${params.id}/auto-location-logs`;

    await httpClient(endpoint, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
      }),
    });

    return { data: { id: params.id } };
  },
};

function buildEndpoint(
  params: GetListParams & QueryFunctionContext,
  resource: string,
) {
  const { page, perPage } = params.pagination!;
  const { field, order } = params.sort!;
  const { search, ...filters } = params.filter ?? {};

  const baseUrl = search
    ? `${host}/${resource}${search}`
    : `${host}/${resource}`;

  const uriParams: Record<string, any> = {
    page: page - 1,
    size: perPage,
    sort: `${field},${order}`,
    ...filters,
  };

  const urlSearchParams = new URLSearchParams(uriParams).toString();
  const symbol = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${symbol}${urlSearchParams}`;
}

function toRecord(item: any) {
  const { _links, ...payload } = item;
  const href = _links.self.href;
  const id = href.substring(href.lastIndexOf("/") + 1);
  return {
    id,
    ...payload,
  };
}

const searchMap: Record<string, string> = {
  tripLogs: "/search/findAllByTripId",
};
