import {
  BooleanInput,
  Edit,
  NumberInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const TrailerEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="modelo" />
      <NumberInput source="anio" label="Año" />
      <TextInput source="serie" />
      <TextInput source="placas" />
      <TextInput source="tarjetaCirculacion" />
      <TextInput source="placaAmericana" />
      <BooleanInput source="status" label="Activo"/>
      <TextInput source="observacion" />
    </SimpleForm>
  </Edit>
);
