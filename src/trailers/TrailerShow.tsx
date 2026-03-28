import { BooleanField, Show, SimpleShowLayout, TextField } from "react-admin";
import { CopyRecordButton } from "../utils/CopyRecordButton";

export const TrailerShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" label="Remolque" />
      <TextField source="modelo" />
      <TextField source="anio" label="Año" />
      <TextField source="serie" />
      <TextField source="baja" />
      <TextField source="placas" />
      <TextField source="tarjetaCirculacion" label="Tarjeta Circulación" />
      <TextField source="placaAmericana" />
      <BooleanField source="status" label="Activo"/>
      <TextField source="observacion" label="Observación" />
      <CopyRecordButton />
    </SimpleShowLayout>
  </Show>
);
