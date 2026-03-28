import {
  BooleanField,
  NumberField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";

export const DriverShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="nombre" />
      <TextField source="apellidoPaterno" />
      <TextField source="apellidoMaterno" />
      <NumberField source="unidad" />
      <BooleanField source="status" />
    </SimpleShowLayout>
  </Show>
);
