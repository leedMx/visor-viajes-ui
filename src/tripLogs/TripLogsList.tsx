import { DataTable, DateField, List } from 'react-admin';

export const TriplogList = () => (
    <List sort={{ field: "id", order: "DESC" }}>
        <DataTable >
            <DataTable.Col source="id" />
            <DataTable.Col source="tripId" />
            <DataTable.Col source="usuario" />
            <DataTable.Col source="tipo" />
            <DataTable.Col source="descripcion" />
            <DataTable.Col source="fecha">
                <DateField source="fecha" showTime />
            </DataTable.Col>
        </DataTable>
    </List>
);