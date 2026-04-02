import Grid from "@mui/material/Grid";
import RouteIcon from "@mui/icons-material/Route";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import BadgeIcon from "@mui/icons-material/Badge";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { DonutStatCard } from "./DonutStatCard";
import { StatCard } from "./StatCard";
import { FleetMapCard } from "./FleetMapCard";

export const Dashboard = () => {
  const tripsByStatus = [
    { id: 1, label: "En trayecto", value: 12, color: "#2e7d32" },
    { id: 2, label: "Resguardo", value: 5, color: "#ed6c02" },
    { id: 3, label: "Pernocta", value: 3, color: "#0288d1" },
    { id: 4, label: "Atención", value: 2, color: "#d32f2f" },
  ];

  const vehiclesIdleOnTrip = [
    { id: 1, label: "En viaje", value: 14, color: "#2e7d32" },
    { id: 2, label: "Idle", value: 9, color: "#6d4c41" },
  ];

  const driversIdleOnTrip = [
    { id: 1, label: "En viaje", value: 11, color: "#2e7d32" },
    { id: 2, label: "Idle", value: 6, color: "#6d4c41" },
  ];

  const gpsWithWithout = [
    { id: 1, label: "Con GPS", value: 28, color: "#2e7d32" },
    { id: 2, label: "Sin GPS", value: 4, color: "#9e9e9e" },
  ];

  const locationsCurrentStale = [
    { id: 1, label: "Actual", value: 24, color: "#2e7d32" },
    { id: 2, label: "Stale", value: 8, color: "#d32f2f" },
  ];

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 3 }}>
        <StatCard title="Atención: Resguardo" value="OK" color="success" hint="0 trips" />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <StatCard title="Atención: Pernocta" value={2} color="warning" hint="Revisar" />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <StatCard title="León Vehicles" value={12} color="primary" hint="8 idle / 4 active" />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <StatCard title="Guadalajara Vehicles" value={7} color="primary" hint="5 idle / 2 active" />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DonutStatCard
          title="Trips split by status"
          data={tripsByStatus}
          icon={<RouteIcon color="primary" />}
          subtitle="Current operational distribution"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <DonutStatCard
          title="Vehicles idle / on-trip"
          data={vehiclesIdleOnTrip}
          icon={<DirectionsCarIcon color="primary" />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <DonutStatCard
          title="Drivers idle / on-trip"
          data={driversIdleOnTrip}
          icon={<BadgeIcon color="primary" />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <DonutStatCard
          title="Vehicles GPS with / without"
          data={gpsWithWithout}
          icon={<GpsFixedIcon color="primary" />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <DonutStatCard
          title="Locations current / stale"
          data={locationsCurrentStale}
          icon={<LocationOnIcon color="primary" />}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <FleetMapCard />
      </Grid>
    </Grid>
  );
};