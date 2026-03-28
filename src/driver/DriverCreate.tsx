import { BooleanInput, Create, NumberInput, required, SimpleForm, TextInput } from 'react-admin';

export const DriverCreate = () => (
    <Create>
        <SimpleForm>
            <NumberInput source="id" validate={required()}/>
            <TextInput source="nombre" />
            <TextInput source="apellidoPaterno" />
            <TextInput source="apellidoMaterno" />
            <NumberInput source="unidad" />
            <BooleanInput source="status" defaultValue={true}/>
        </SimpleForm>
    </Create>
);