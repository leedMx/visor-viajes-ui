import {
  ColumnsButton,
  DataTable,
  DateField,
  List,
  TopToolbar,
} from "react-admin";

const Actions = () => (
  <TopToolbar>
    <ColumnsButton />
  </TopToolbar>
);

export const LocationList = () => (
  <List actions={<Actions />} >
    <DataTable bulkActionButtons={false}>
      <DataTable.Col source="id" />
      <DataTable.Col source="proveedor" />
      <DataTable.NumberCol source="latitud" />
      <DataTable.NumberCol source="longitud" />
      <DataTable.Col source="velocidad" />
      <DataTable.Col source="hora" label="Fecha ubicacion">
        <DateField source="hora" showTime />
      </DataTable.Col>
      <DataTable.Col source="ubicacion" label="Ubicación" />
      <DataTable.Col source="direccion" label="Dirección" />
      <DataTable.Col source="ciudad" />
      <DataTable.Col source="estado" />
      <DataTable.Col source="updatedAt" label="Ultima actualización">
        <DateField source="updatedAt" showTime />
      </DataTable.Col>
    </DataTable>
  </List>
);
