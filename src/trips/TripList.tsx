import {
  DataTable,
  List,
  SelectInput,
  Pagination,
  TopToolbar,
  ColumnsButton,
  CreateButton,
  ExportButton,
  TextInput,
  FilterButton,
  NumberInput,
  required,
  SimpleList,
  InfiniteList,
  InfinitePagination,
  DateInput,
  DateField,
} from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";

import { statusChoices } from "../utils/constants";
import { gutterBar, StatusChip } from "./TripShow/TripFields";
import RouteIcon from "@mui/icons-material/Route";
import { smallEllipsisCell, ellipsisCell } from "../utils/Utils";
import { getTabId } from "../storage/tabId";
import { TripExpand } from "./TripExpand";

const ACTIVOS = "/search/active";
const TERMINADOS = "/search/finished";
const TODOS = "/search/filtered";
const STORE_KEY = `trips.${getTabId()}`;

const filters = [
  <SelectInput
    source="search"
    label="Activo/Terminado"
    choices={[
      { id: ACTIVOS, name: "Activos" },
      { id: TERMINADOS, name: "Terminados" },
      { id: TODOS, name: "Todos" },
    ]}
    alwaysOn
    validate={required()}
  />,
  <NumberInput source="vehicleId" label="Unidad" />,
  <NumberInput source="trailerId" label="Remolque" />,
  <NumberInput source="driverId" label="Operador" />,
  <SelectInput
    source="estatus"
    label="Estatus"
    choices={statusChoices}
    optionText="name"
  />,
  <TextInput source="client" label="Cliente" />,
  <DateInput source="createdFrom" label="Fecha de creación" />,
];

const CustomPagination = () => (
  <Pagination rowsPerPageOptions={[10, 25, 50, 100, 150, 200]} />
);

const ViajeListActions = () => (
  <TopToolbar>
    <CreateButton />
    <FilterButton />
    <ColumnsButton storeKey={STORE_KEY} />
    <ExportButton />
  </TopToolbar>
);

const rowStyle = () => (record: any) => gutterBar(record?.estatus);

export const TripList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  if (isSmall) {
    return <MobileList />;
  }
  return <DesktopList />;
};

const MobileList = () => (
  <InfiniteList
    sort={{ field: "id", order: "DESC" }}
    filters={filters}
    filterDefaultValues={{ search: ACTIVOS }}
    perPage={25}
    pagination={<InfinitePagination />}
    actions={<ViajeListActions />}
  >
    <SimpleList
      rowClick="show"
      primaryText={(record: any) => (
        <>
          <strong>{record.idUnidad ?? "-"}</strong>
          {" · "}
          {record.cliente ?? ""}
        </>
      )}
      secondaryText={() => (
        <span>
          <StatusChip />
        </span>
      )}
      tertiaryText={(record: any) => record.id}
      leftIcon={() => <RouteIcon color="primary" />}
    />
  </InfiniteList>
);

const DesktopList = () => (
  <List
    sort={{ field: "id", order: "DESC" }}
    filters={filters}
    filterDefaultValues={{ search: ACTIVOS }}
    perPage={100}
    pagination={<CustomPagination />}
    actions={<ViajeListActions />}
  >
    <DataTable
      size="small"
      bulkActionButtons={false}
      hiddenColumns={[
        "creationTime",
        "startTime",
        "endTime",
        "idOperador",
        "idRemolque",
        "unidadEnvio",
        "importe",
        "kilometraje",
      ]}
      storeKey={STORE_KEY}
      rowSx={rowStyle()}
      expand={TripExpand}
      expandSingle={true}
      rowClick="expand"
    >
      <DataTable.Col source="id" label="Viaje" sx={{ width: 80 }} />
      
      <DataTable.Col source="idUnidad" label="Unidad" sx={{ width: 90 }} />
      <DataTable.Col source="idOperador" label="Operador" sx={{ width: 90 }} />
      <DataTable.Col source="idRemolque" label="Remolque" sx={smallEllipsisCell} />
      <DataTable.Col source="creationTime" label="Creación">
        <DateField source="creationTime" />
      </DataTable.Col>
      <DataTable.Col source="startTime" label="Inicio">
        <DateField source="startTime" />
      </DataTable.Col>
      <DataTable.Col source="endTime" label="Terminación">
        <DateField source="endTime" />
      </DataTable.Col>

      <DataTable.Col source="cliente" sx={ellipsisCell} />
      <DataTable.Col source="origen" sx={ellipsisCell} />
      <DataTable.Col source="destino" sx={ellipsisCell} />

      <DataTable.Col source="estatus">
        <StatusChip />
      </DataTable.Col>
      <DataTable.Col source="unidadEnvio" sx={smallEllipsisCell} />

      <DataTable.NumberCol source="importe" />
      <DataTable.NumberCol source="kilometraje" />
    </DataTable>
  </List>
);
