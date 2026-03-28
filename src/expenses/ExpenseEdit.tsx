import { Grid, InputAdornment } from "@mui/material";
import {
  BooleanInput,
  DateField,
  Edit,
  NumberField,
  NumberInput,
  required,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
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

const AmountDetails = () => {
  return (
    <>
      <SimpleShowLayout>
        <NumberField
        source="cantidad"
        options={{
          style: "currency",
          currency: "MXN",
          minimumFractionDigits: 2,
        }}
      />
        <TextField
          source="observaciones"
          label="Observaciones de solicitante"
        />
      </SimpleShowLayout>
      <SimpleForm>
        <NumberInput
          source="cantidadAutorizada"
          step={50}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            },
          }}
          validate={required()}
        />
        <TextInput
          source="observacionesOficina"
          label="Observaciones de aprobador"
          rows={3}
          multiline
        />
        {/* <TextInput source="idViaje" helperText="Prrecaución: Solo cambie el número de viaje cuando sea absolutamente necesario"/> */}
        <BooleanInput source="depositado" />
      </SimpleForm>
    </>
  );
};

export const ExpenseEdit = () => (
  <div>
    <Edit redirect="list">
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
    </Edit>
  </div>
);
