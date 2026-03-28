import {
  CanAccess,
  Datagrid,
  DateField,
  ReferenceManyField,
  SimpleList,
  TextField,
} from "react-admin";
import { Pagination } from "react-admin";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { TripLogUpdateButton } from "./TripLogUpdateButton";
import { LocationButton } from "./TripLogLocationButton";

export const TripShowTripLogList = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <CanAccess resource="tripLogs" action="list">
      <Stack spacing={2} padding={1}>
        <Stack direction="row" spacing={1}>
          <TripLogUpdateButton />
          <LocationButton />
        </Stack>
        <ReferenceManyField
          label="Todas las actualizaciones"
          reference="tripLogs"
          target="tripId"
          sort={{ field: "id", order: "DESC" }}
          perPage={25}
          pagination={<Pagination rowsPerPageOptions={[25, 50, 75, 100]} />}
        >
          {isSmall ? (
            <SimpleList
              primaryText={(record) =>
                new Date(record.fecha).toLocaleString("es-MX", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }
              secondaryText={(record) => record.descripcion}
            />
          ) : (
            <Datagrid bulkActionButtons={false} size="small" rowClick={false}>
              <TextField source="id" />
              <DateField source="fecha" label="Fecha y Hora" showTime />
              <TextField source="tipo" />
              <TextField source="descripcion" label="Descripción" />
              <TextField source="usuario" />
            </Datagrid>
          )}
        </ReferenceManyField>
      </Stack>
    </CanAccess>
  );
};
