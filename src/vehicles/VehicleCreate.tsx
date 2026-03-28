import { BooleanInput, Create, NumberInput, required, SimpleForm, TextInput } from 'react-admin';

export const VehicleCreate = () => (
    <Create>
        <SimpleForm>
            <NumberInput source="id" validate={required()}/>
            <TextInput source="marca" />
            <TextInput source="modelo" />
            <NumberInput source="anio" label="Año"/>
            <TextInput source="serie" />
            <TextInput source="placas" validate={required()}/>
            <BooleanInput source="status" defaultValue={true} />
            <TextInput source="observacion" />
        </SimpleForm>
    </Create>
);