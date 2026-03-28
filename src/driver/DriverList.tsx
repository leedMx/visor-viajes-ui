import {
  BooleanField,
  ColumnsButton,
  CreateButton,
  DataTable,
  ExportButton,
  List,
  required,
  SelectInput,
  TopToolbar,
} from "react-admin";

const filters = [
  <SelectInput
    source="search"
    label="Mostrar"
    choices={[
      { id: "/search/findActive", name: "Activos" },
      { id: "/search/findInactive", name: "Bajas" },
    ]}
    alwaysOn
    validate={required()}
  />,
];

const Actions = () => (
  <TopToolbar>
    <CreateButton />
    <ColumnsButton />
    <ExportButton />
  </TopToolbar>
);

export const DriverList = () => (
  <List
    sort={{ field: "id", order: "DESC" }}
    filters={filters}
    filterDefaultValues={{ search: "/search/findActive" }}
    actions={<Actions />}
  >
    <DataTable
      bulkActionButtons={false}
      hiddenColumns={["nombre", "apellidoPaterno", "apellidoMaterno"]}
    >
      <DataTable.Col source="id" />
      <DataTable.Col source="nombre" />
      <DataTable.Col source="apellidoPaterno" />
      <DataTable.Col source="apellidoMaterno" />
      <DataTable.Col source="nombreCompleto" />
      <DataTable.NumberCol source="unidad" />
      <DataTable.Col source="status">
        <BooleanField source="status" />
      </DataTable.Col>
    </DataTable>
  </List>
);
