import { useState } from "react";
import { useRecordContext, useResourceContext, useDataProvider, useNotify, useRefresh, Button } from "react-admin";
import { AppDataProvider } from "../../config/dataProvider";
import AddIcon from "@mui/icons-material/Add";

export const LocationButton = () => {
  const record = useRecordContext<any>();
  const resource = useResourceContext() || "trips";
  const dataProvider = useDataProvider<AppDataProvider>();
  const notify = useNotify();
  const refresh = useRefresh();
  const [loading, setLoading] = useState(false);
  if (!record) return null;

  const addLocation = async () => {
    setLoading(true);
    try {
      await dataProvider.logCurrentLocation(resource, { id: record.id });
      notify("ra.notification.created", { type: "info" });
      refresh();
    } catch (error) {
      notify(
        error instanceof Error ? error.message : "Error al registrar ubicación",
        { type: "warning" },
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      label="Ubicación"
      size="small"
      variant="contained"
      startIcon={<AddIcon />}
      onClick={addLocation}
      disabled={loading}
      sx={{flexGrow:1}}
    >
      Ubicación
    </Button>
  );
};