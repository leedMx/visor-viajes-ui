import {
  BooleanInput,
  Edit,
  NumberInput,
  required,
  SimpleForm,
  TextInput,
} from "react-admin";

export const VehicleEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="marca" />
      <TextInput source="modelo" />
      <NumberInput source="anio" label="Año" />
      <TextInput source="serie" />
      <TextInput source="placas" validate={required()} />
      <TextInput source="imei" disabled />
      <BooleanInput source="status" label="Activa" />
      <BooleanInput
        source="gps"
        helperText="Las unidades con Gps se incluyen en el rol"
      />
      <TextInput source="observacion" />
    </SimpleForm>
  </Edit>
);
