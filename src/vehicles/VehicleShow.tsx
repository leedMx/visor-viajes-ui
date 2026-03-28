import { BooleanField, Show, SimpleShowLayout, TextField } from "react-admin";
import { CopyRecordButton } from "../utils/CopyRecordButton";

export const VehicleShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="marca" />
      <TextField source="modelo" />
      <TextField source="anio" label="Año" />
      <TextField source="serie" />
      <TextField source="placas" />
      <TextField source="imei" />
      <BooleanField source="status" label="Activa" />
      <BooleanField source="gps" />
      <TextField source="observacion" />
      <CopyRecordButton />
    </SimpleShowLayout>
  </Show>
);
