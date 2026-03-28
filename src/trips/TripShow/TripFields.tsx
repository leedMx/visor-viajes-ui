import {
  Chip,
  ChipProps,
  Stack,
  type SxProps,
} from "@mui/material";
import {
  useRecordContext,
} from "react-admin";
import { statusChoices, statusToColor } from "../../utils/constants";
import { ArrowRightAlt } from "@mui/icons-material";

export const StatusChip = (props: ChipProps) => {
  const record = useRecordContext<any>();
  if (!record) return null;
  const value = record.estatus;
  const choice = statusChoices.find((c) => c.id === value);
  const label = choice ? choice.name : value;
  const statusColor = statusToColor[value] ?? "default";

  return <Chip label={label} size="small" color={statusColor} {...props} />;
};

export const RouteField = () => {
  const record = useRecordContext<any>();
  if (!record) return null;

  const origenes: string[] = (record.origen ?? "-")
    .split(",")
    .map((s: string) => s.trim())
    .filter(Boolean);

  const destinos: string[] = (record.destino ?? "-")
    .split(",")
    .map((s: string) => s.trim())
    .filter(Boolean);

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      flexWrap="wrap"
      useFlexGap
    >
      {origenes.map((ori, i) => (
        <Chip
          key={`ori-${i}`}
          size="small"
          label={ori}
          color="primary"
          variant="outlined"
        />
      ))}

      <ArrowRightAlt fontSize="small" color="action" />

      {destinos.map((dest, i) => (
        <Chip key={`dest-${i}`} size="small" label={dest} color="primary" />
      ))}
    </Stack>
  );
};

export const gutterBar = (status?: string): SxProps => {
  const key = status ? statusToColor[status] : undefined;

  if (!key || key === "default") {
    return {};
  }

  const paletteToken = `${key}.main` as
    | "primary.main"
    | "secondary.main"
    | "success.main"
    | "warning.main"
    | "error.main"
    | "info.main";

  return {
    "& td:first-of-type": {
      position: "relative",
      "&::before": {
        content: '""',
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: 4,
        bgcolor: paletteToken,
        borderRadius: 2,
      },
    },
  };
};