import {
  CanAccess,
  Datagrid,
  DateField,
  ReferenceManyField,
  ShowButton,
  SimpleShowLayout,
  TextField,
} from "react-admin";
import { TripLogUpdateButton } from "./TripLogUpdateButton";
import { Stack } from "@mui/material";
import { LocationButton } from "./TripLogLocationButton";

export const TripShowTripLogSummary = () => (
  <SimpleShowLayout>
    <CanAccess resource="tripLogs" action="list">
      <Stack spacing={1} >
        <Stack spacing={1} direction={"row"} width={1}>
          <TripLogUpdateButton />
          <LocationButton />
        </Stack>
        <ReferenceManyField
          label="Logs de viaje"
          reference="tripLogs"
          target="tripId"
          sort={{ field: "id", order: "DESC" }}
          perPage={4}
        >
          <Datagrid
            bulkActionButtons={false}
            size="small"
            rowClick={false}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <DateField
              source="fecha"
              showTime
              options={{
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }}
              sortable={false}
              sx={{
                whiteSpace: "nowrap",
              }}
            />
            <TextField source="tipo" sortable={false} />
            <TextField
              source="descripcion"
              label="Descripción"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              sortable={false}
            />
            <TextField
              source="usuario"
              sortable={false}
              sx={{
                whiteSpace: "nowrap",
              }}
            />
          </Datagrid>
        </ReferenceManyField>
        <ShowButton label="Ver todos"/>
      </Stack>
    </CanAccess>
  </SimpleShowLayout>
);
