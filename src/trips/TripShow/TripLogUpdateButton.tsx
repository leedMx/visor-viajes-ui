import { FC, useState } from "react";
import {
  Button,
  CanAccess,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
  required,
  useCreate,
  useGetIdentity,
  useNotify,
  useRecordContext,
  useRefresh,
} from "react-admin";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type TripLogFormProps = {
  onDone?: () => void;
};

const TripLogForm: FC<TripLogFormProps> = ({ onDone }) => {
  const [resetIndex, setResetIndex] = useState(0);

  const record = useRecordContext<any>();
  const tripId = record?.id;

  const { data: identity } = useGetIdentity();
  const usuario = identity?.fullName || "sistema";

  const [create] = useCreate();
  const notify = useNotify();
  const refresh = useRefresh();

  const handleSubmit = (values: any) => {
    if (!tripId) {
      notify("No se encontró el viaje", { type: "warning" });
      return;
    }

    create(
      "tripLogs",
      {
        data: {
          tripId,
          usuario,
          tipo: "Observacion",
          descripcion: values.descripcion,
        },
      },
      {
        onSuccess: () => {
          notify("ra.notification.created", { type: "info" });
          refresh();
          setResetIndex((i) => i + 1);
          onDone?.();
        },
        onError: (error) => {
          if (error instanceof Error) {
            notify(error.message, { type: "error" });
          } else {
            notify("Unexpected error", { type: "error" });
          }
        },
      },
    );
  };

  return (
    <SimpleForm
      key={resetIndex}
      onSubmit={handleSubmit}
      toolbar={
        <Toolbar>
          <SaveButton />
        </Toolbar>
      }
    >
      <TextInput
        source="descripcion"
        label="Descripción"
        validate={required()}
        fullWidth
      />
    </SimpleForm>
  );
};

export const TripLogUpdateButton: FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <CanAccess resource="tripLogs" action="create">
      <>
        <Button
          size="small"
          variant="contained"
          startIcon={<AddIcon />}
          label="Observación"
          onClick={handleOpen}
          sx={{flexGrow:1}}
        />
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Agregar observación</DialogTitle>
          <DialogContent>
            <TripLogForm onDone={handleClose} />
          </DialogContent>
        </Dialog>
      </>
    </CanAccess>
  );
};
