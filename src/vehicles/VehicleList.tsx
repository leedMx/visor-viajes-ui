import {
  BooleanField,
  ColumnsButton,
  CreateButton,
  DataTable,
  ExportButton,
  List,
  required,
  SelectInput,
  ShowButton,
  TopToolbar,
} from "react-admin";
import { CopyRecordButton } from "../utils/CopyRecordButton";
import { ellipsisCell } from "../utils/Utils";

const filters = [
  <SelectInput
    source="search"
    label="Mostrar"
    choices={[
      { id: "/search/findActive", name: "Activos" },
      { id: "/search/findInactive", name: "Inactivos" },
    ]}
    alwaysOn
    validate={required()}
  />,
];

const actions = (
  <TopToolbar>
    <CreateButton />
    <ColumnsButton />
    <ExportButton />
  </TopToolbar>
);

export const VehicleList = () => (
  <List
    sort={{ field: "id", order: "DESC" }}
    actions={actions}
    filters={filters}
    filterDefaultValues={{ search: "/search/findActive" }}
  >
    <DataTable
      bulkActionButtons={false}
      rowClick={"edit"}
      hiddenColumns={["observacion", "anio", "serie", "imei", "gps", "status"]}
    >
      <DataTable.Col source="id" />
      <DataTable.Col source="marca" sx={ellipsisCell} />
      <DataTable.Col source="modelo" />
      <DataTable.Col source="anio" label="Año" />
      <DataTable.Col source="serie" />
      <DataTable.Col source="placas" />
      <DataTable.Col source="imei" />
      <DataTable.Col source="observacion" />
      <DataTable.Col source="gps">
        <BooleanField source="gps" />
      </DataTable.Col>
      <DataTable.Col source="status" label="Activa">
        <BooleanField source="status" />
      </DataTable.Col>
      <DataTable.Col>
        <CopyRecordButton />
      </DataTable.Col>
      <DataTable.Col>
        <ShowButton />
      </DataTable.Col>
    </DataTable>
  </List>
);
