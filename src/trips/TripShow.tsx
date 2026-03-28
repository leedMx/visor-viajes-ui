// TripShow.tsx
import {
  CanAccess,
  DateField,
  EditButton,
  NumberField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";
import { Grid } from "@mui/material";
import { RouteField,  } from "./TripShow/TripFields";
import { TripShowTripLogList } from "./TripShow/TripShowTripLogList";
import { TripStatusInputField } from "./TripShow/TripStatusInputField";

export const TripShow = () => {
  return (
    <Show>
      <Grid container>
        <Grid size={{ xs: 6 }}>
          <TripShowDetails />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <TripShowCustomer />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TripShowTripLogList />
        </Grid>
      </Grid>
    </Show>
  );
};

export const TripShowDetails = () => {
  return (
    <SimpleShowLayout>
      // Status
      <TripStatusInputField />
      <TextField source="id" />
      // Operador
      <CanAccess
        resource="drivers"
        action="show"
        accessDenied={<TextField source="idOperador" />}
      >
        <ReferenceField
          source="idOperador"
          label="Operador"
          reference="drivers"
        />
      </CanAccess>
      // Unidad
      <CanAccess
        resource="vehicles"
        action="show"
        accessDenied={<TextField source="idUnidad" />}
      >
        <ReferenceField source="idUnidad" reference="vehicles" />
      </CanAccess>
      // Remolque
      <CanAccess
        resource="trailers"
        action="show"
        accessDenied={<TextField source="idRemolque" />}
      >
        <ReferenceField source="idRemolque" reference="trailers" />
      </CanAccess>
      <DateField source="creationTime" label="Creación" showTime />
      <DateField source="startTime" label="Inicio" showTime />
      <DateField source="endTime" label="Terminación" showTime />
    </SimpleShowLayout>
  );
};

export const TripShowCustomer = () => {
  return (
    <SimpleShowLayout>
      <RouteField />
      <TextField source="cliente" />
      <TextField source="unidadEnvio" />
      <NumberField
        source="importe"
        label="Importe"
        options={{
          style: "currency",
          currency: "MXN",
          minimumFractionDigits: 2,
        }}
      />
      <NumberField source="kilometraje" label="Kilometraje" />
      <EditButton sx={{flexGrow: 1}}/>
    </SimpleShowLayout>
  );
};
