import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import L from "leaflet";
import { Link, useGetList } from "react-admin";
import "./leafletSetup";
import { Link as RouterLink } from 'react-router-dom';
import { Title } from "@mui/icons-material";

const mexicoCenter: [number, number] = [23.6345, -102.5528];

type VehicleStatusRecord = {
  id: string | number;
  economico?: string;
  latitud?: number | null;
  longitud?: number | null;
  ciudad?: string | null;
  estado?: string | null;
  tripId?: string | number | null;
  tripStatus?: string | null;
};

type FleetPoint = {
  name: string;
  lat: number;
  lng: number;
  record: VehicleStatusRecord;
};

export const FleetMapCard = () => {
  const { data, isLoading, error } = useGetList<VehicleStatusRecord>(
    "vehicleStatus",
    {
      pagination: { page: 1, perPage: 100 },
      sort: { field: "id", order: "DESC" },
    },
  );

  console.log(data);

  const points: FleetPoint[] = (data ?? [])
    .filter(
      (record) =>
        record.economico != null &&
        record.latitud != null &&
        record.longitud != null,
    )
    .map((record) => ({
      name: record.economico!,
      lat: record.latitud!,
      lng: record.longitud!,
      record,
    }));

  console.log(points);

  return (
    <Card>
      <CardContent>
        {isLoading ? (
          <div
            style={{ display: "flex", justifyContent: "center", padding: 24 }}
          >
            <CircularProgress />
          </div>
        ) : error ? (
          <Typography color="error">Error cargando ubicaciones.</Typography>
        ) : points.length === 0 ? (
          <Typography>No hay coordenadas disponibles.</Typography>
        ) : (
          <div style={{ height: 500, width: "100%" }}>
            <MapContainer
              center={mexicoCenter}
              zoom={5}
              scrollWheelZoom
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <FitBounds points={points} />

              {points.map((point) => (
                <Marker key={point.record.id} position={[point.lat, point.lng]}>
                  <Popup>
                    <Box sx={{ minWidth: 220, py: 0.5 }}>
                      <Stack spacing={1}>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={700}>
                            {point.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {point.record.ciudad ?? "Sin ciudad"}
                            {point.record.estado
                              ? `, ${point.record.estado}`
                              : ""}
                          </Typography>
                        </Box>

                        {point.record.tripStatus && (
                          <Chip
                            label={point.record.tripStatus}
                            size="small"
                            variant="outlined"
                            sx={{ alignSelf: "flex-start" }}
                          />
                        )}

                        <Divider />

                        {point.record.tripId ? (
                          <Link
                            component={RouterLink}
                            to={`/trips/${point.record.tripId}/show`}
                            underline="hover"
                            sx={{ fontWeight: 500 }}
                          >
                            Ver viaje #{point.record.tripId}
                          </Link>
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            Sin viaje asociado
                          </Typography>
                        )}
                      </Stack>
                    </Box>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

function FitBounds({ points }: { points: FleetPoint[] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView([points[0].lat, points[0].lng], 8);
      return;
    }
    const bounds = L.latLngBounds(
      points.map((point) => [point.lat, point.lng] as [number, number]),
    );
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [map, points]);
  return null;
}
