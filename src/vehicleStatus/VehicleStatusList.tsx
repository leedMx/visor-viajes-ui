import {
  CanAccess,
  ColumnsButton,
  DataTable,
  ExportButton,
  FilterButton,
  List,
  Pagination,
  ReferenceField,
  SelectInput,
  TextField,
  TextInput,
  TopToolbar,
} from "react-admin";
import { statusChoices } from "../utils/constants";
import { VehicleStatusChip } from "./VehicleStatusFields";

const filters = [
  <SelectInput
    source="estatus"
    label="Estatus"
    choices={statusChoices}
    optionText="name"
  />,
  <TextInput source="client" label="Cliente" />,
];

export const VehiclestatusList = () => (
  <List
    pagination={<Pagination rowsPerPageOptions={[25, 50, 75, 100]} />}
    actions={
      <TopToolbar>
        <ColumnsButton />
        <FilterButton />
        <ExportButton />
      </TopToolbar>
    }
    filter={{ search: "/search/filtered" }}
    filters={filters}
  >
    <DataTable
      size="small"
      bulkActionButtons={false}
      hiddenColumns={[
        "driverId",
        "ubicacion",
        "estado",
        "latitud",
        "longitud",
        "tripStatus",
        "origen",
        "destino",
      ]}
    >
      <DataTable.Col source="tripId" label="Viaje">
        <CanAccess
          resource="trips"
          action="show"
          accessDenied={<TextField source="tripId" label="Viaje" />}
        >
          <ReferenceField source="tripId" reference="trips" />
        </CanAccess>
      </DataTable.Col>

      <DataTable.Col source="economico" label="Unidad" />
      <DataTable.Col source="trailerId" label="Remolque" />
      <DataTable.Col source="driverId" label="Clave operador" />
      <DataTable.Col source="nombreCompleto" label="Operador" />

      <DataTable.Col source="cliente" />
      <DataTable.Col source="origen" />
      <DataTable.Col source="destino" />
      <DataTable.Col source="unidadEnvio" />
      <DataTable.Col source="tripStatus" label="Estatus">
        <VehicleStatusChip />
      </DataTable.Col>
      <DataTable.Col source="ubicacion" label="Ubicación" />
      <DataTable.Col source="direccion" label="Dirección" />
      <DataTable.Col source="ciudad" />
      <DataTable.Col source="estado" />
      <DataTable.Col source="latitud" />
      <DataTable.Col source="longitud" />
    </DataTable>
  </List>
);
