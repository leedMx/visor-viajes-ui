import {
  BooleanInput,
  Create,
  NumberInput,
  required,
  SimpleForm,
  TextInput,
} from "react-admin";

export const TrailerCreate = () => (
  <Create>
    <SimpleForm>
      <NumberInput source="id" validate={required()} />
      <TextInput source="modelo" />
      <NumberInput source="anio" label="Año" />
      <TextInput source="serie" />
      <TextInput source="placas" />
      <TextInput source="tarjetaCirculacion" />
      <TextInput source="placaAmericana" />
      <BooleanInput source="status" defaultValue={true} />
      <TextInput source="observacion" />
    </SimpleForm>
  </Create>
);
