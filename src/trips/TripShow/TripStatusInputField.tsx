import { MenuItem, TextField } from "@mui/material";
import { FC, useState, useEffect } from "react";
import { useRecordContext, useResourceContext, useNotify, useRefresh, useRedirect, useUpdate } from "react-admin";
import { statusChoices } from "../../utils/constants";

export const TripStatusInputField: FC = () => {
  const record = useRecordContext<any>();
  const resource = useResourceContext() || "trips";
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();
  const [update, { isPending }] = useUpdate();

  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(record?.estatus ?? "");
  }, [record?.estatus]);

  if (!record) return null;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = event.target.value;

    setValue(newStatus);

    if (newStatus === (record.estatus ?? "")) {
      return;
    }

    update(
      resource,
      {
        id: record.id,
        data: { ...record, estatus: newStatus },
        previousData: record,
      },
      {
        mutationMode: "pessimistic",
        onSuccess: () => {
          notify("ra.notification.updated", {
            type: "info",
            messageArgs: { smart_count: 1 },
          });
          if (newStatus === "TERMINADO") {
            redirect("show", resource, record.id);
            return;
          }
          refresh();
        },
        onError: () => {
          notify("ra.notification.http_error", { type: "warning" });
          setValue(record.estatus ?? "");
        },
      },
    );
  };

  return (
    <TextField
      select
      size="small"
      label="Estatus"
      value={value}
      disabled={isPending}
      onChange={handleChange}
      sx={{ minWidth: 160 }}
    >
      {statusChoices.map((choice) => (
        <MenuItem key={choice.id} value={choice.id}>
          {choice.name}
        </MenuItem>
      ))}
    </TextField>
  );
};
