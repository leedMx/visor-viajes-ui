import {
  BooleanField,
  ColumnsButton,
  CreateButton,
  DataTable,
  DateField,
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

export const TrailerList = () => (
  <List
    sort={{ field: "id", order: "DESC" }}
    actions={actions}
    filters={filters}
    filterDefaultValues={{ search: "/search/findActive" }}
  >
    <DataTable
      bulkActionButtons={false}
      rowClick={"edit"}
      hiddenColumns={[
        "baja",
        "tarjetaCirculacion",
        "placaAmericana",
        "observacion",
        "anio",
        "serie",
        "status",
      ]}
    >
      <DataTable.Col source="id" />
      <DataTable.Col source="modelo" sx={ellipsisCell} />
      <DataTable.Col source="anio" label="Año" />
      <DataTable.Col source="serie" sx={ellipsisCell} />
      <DataTable.Col source="baja">
        <DateField source="baja" />
      </DataTable.Col>
      <DataTable.Col source="placas" />
      <DataTable.Col source="tarjetaCirculacion" />
      <DataTable.Col source="placaAmericana" />
      <DataTable.Col source="observacion" />
      <DataTable.Col source="status">
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
