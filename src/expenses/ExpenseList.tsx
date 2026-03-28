import {
  BooleanField,
  CanAccess,
  ColumnsButton,
  CreateButton,
  DataTable,
  DateField,
  DateInput,
  FilterButton,
  List,
  ReferenceField,
  required,
  TopToolbar,
  useGetIdentity,
  usePermissions,
} from "react-admin";

const filters = [
  <DateInput
    source="dia"
    label="Fecha de creación"
    alwaysOn={true}
    validate={required()}
  />,
];

const actions = (
  <TopToolbar>
    <CreateButton />
    <ColumnsButton />
    <FilterButton />
  </TopToolbar>
);

const today = new Date().toISOString().split("T")[0];

export const ExpenseList = () => {
  const { data: identity } = useGetIdentity();
  const { permissions, isPending } = usePermissions();
  if (isPending) return null;
  const isOnlyExpenseCreator =
    permissions.includes("EXPENSES_CREATE") &&
    !permissions.includes("EXPENSES_UPDATE");

  const hardFilter = {
    search: "/search/findByDia",
    ...(isOnlyExpenseCreator ? { usuario: identity?.fullName } : {}),
  };

  const rowClickValue = permissions.includes("EXPENSES_UPDATE")
    ? "edit"
    : "show";

  return (
    <List
      sort={{ field: "id", order: "DESC" }}
      actions={actions}
      filters={filters}
      filter={hardFilter}
      filterDefaultValues={{ dia: today }}
    >
      <DataTable
        rowClick={rowClickValue}
        bulkActionButtons={false}
        hiddenColumns={[
          "idViaje",
          "unidad",
          "descripcion",
          "usuario",
          "descripcion",
          "cantidadAprobada",
          "hora",
          "observacionesOficina",
          "idViaje",
          "idUnidad",
          "idRemolque",
          "cliente",
        ]}
      >
        <DataTable.Col source="id" />
        <CanAccess
          resource="drivers"
          action="list"
          accessDenied={<DataTable.Col source="idOperador" />}
        >
          <DataTable.Col source="idOperador">
            <ReferenceField source="idOperador" reference="drivers" />
          </DataTable.Col>
        </CanAccess>
        <CanAccess
          resource="trips"
          action="list"
          accessDenied={<DataTable.Col source="idViaje" />}
        >
          <DataTable.Col source="idViaje">
            <ReferenceField source="idViaje" reference="trips" />
          </DataTable.Col>
        </CanAccess>

        <DataTable.Col source="idUnidad" />
        <DataTable.Col source="idRemolque" />
        <DataTable.Col source="cliente" />
        <DataTable.Col source="oficina" />
        <DataTable.Col source="usuario" />
        <DataTable.Col source="tipo" />
        <DataTable.Col source="descripcion" />
        <DataTable.NumberCol
          source="cantidad"
          label="Solicitado"
          options={{
            minimumFractionDigits: 2,
          }}
        />
        <DataTable.NumberCol
          source="cantidadAprobada"
          label="Aprobado"
          options={{
            minimumFractionDigits: 2,
          }}
        />
        <DataTable.Col source="hora">
          <DateField source="hora" showTime />
        </DataTable.Col>
        <DataTable.Col
          source="observaciones"
          label="Observaciones de solicitante"
        />
        <DataTable.Col
          source="observacionesOficina"
          label="Observaciones de aprobador"
        />
        <DataTable.Col source="depositado">
          <BooleanField source="depositado" />
        </DataTable.Col>
      </DataTable>
    </List>
  );
};
