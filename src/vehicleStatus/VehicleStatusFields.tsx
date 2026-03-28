import { ChipProps, Chip } from "@mui/material";
import { useRecordContext } from "react-admin";
import { statusChoices, statusToColor } from "../utils/constants";

export const VehicleStatusChip = (props: ChipProps) => {
  const record = useRecordContext<any>();
  if (!record) return null;
  const value = record.tripStatus;
  const choice = statusChoices.find((c) => c.id === value);
  const label = choice ? choice.name : value;
  const statusColor = statusToColor[value] ?? "default";

  return <Chip label={label} size="small" color={statusColor} {...props} />;
};
