import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button, useRecordContext, useNotify } from 'react-admin';

export const CopyRecordButton = () => {
  const record = useRecordContext();
  const notify = useNotify();
  if (!record) return null;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const values = Object.values(record).map(v =>
      v == null ? '' : String(v).trim()
    );

    const tsv = values.join('\t');

    navigator.clipboard
      .writeText(tsv)
      .then(() => {
        notify("ra.notification.copied", { type: 'info' });
      })
      .catch(err => {
        console.error(err);
        notify("ra.notification.copy_error", { type: 'warning' });
      });
  };

  return (
    <Button label="Copiar" onClick={handleClick} size="small">
      <ContentCopyIcon fontSize="small" />
    </Button>
  );
};
