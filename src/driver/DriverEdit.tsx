import { BooleanInput, Edit, NumberInput, SimpleForm, TextInput } from 'react-admin';

export const DriverEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled/>
            <TextInput source="nombre" />
            <TextInput source="apellidoPaterno" />
            <TextInput source="apellidoMaterno" />
            <NumberInput source="unidad" />
            <BooleanInput source="status" />
        </SimpleForm>
    </Edit>
);