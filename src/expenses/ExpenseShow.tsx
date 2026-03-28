import { Grid } from "@mui/material";
import {
  BooleanField,
  DateField,
  NumberField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";

const ExpenseDetails = () => {
  return (
    <SimpleShowLayout>
      <TextField source="id" />
      <DateField source="hora" showTime />
      <TextField source="oficina" />
      <TextField source="usuario" />
      <TextField source="tipo" />
      <TextField source="idOperador" />
    </SimpleShowLayout>
  );
};

const TripDetails = () => {
  return (
    <SimpleShowLayout>
      <TextField source="idViaje" />
      <TextField source="idUnidad" />
      <TextField source="idRemolque" />
      <TextField source="origen" />
      <TextField source="destino" />
      <TextField source="cliente" />
      <TextField source="descripcion" />
    </SimpleShowLayout>
  );
};

const AmountDetails = () => (
  <SimpleShowLayout>
    <NumberField
      source="cantidad"
      options={{
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: 2,
      }}
    />
    <TextField source="observaciones" label="Observaciones de solicitante" />
    <NumberField
      source="cantidadAutorizada"
      options={{
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: 2,
      }}
    />
    <TextField
      source="observacionesOficina"
      label="Observaciones de aprobador"
    />
    <BooleanField source="depositado" />
  </SimpleShowLayout>
);

export const ExpenseShow = () => (
  <Show>
    <Grid container>
      <Grid size={{ xs: 4 }}>
        <ExpenseDetails />
      </Grid>
      <Grid size={{ xs: 4 }}>
        <TripDetails />
      </Grid>
      <Grid size={{ xs: 4 }}>
        <AmountDetails />
      </Grid>
    </Grid>
  </Show>
);
