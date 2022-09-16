import React, { useEffect } from 'react';

// mui components
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function AlertDialog({ sendToParent, dialogStatus }) {
  // store
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(dialogStatus);
  }, [dialogStatus]);

  const handleClose = (response) => {
    setOpen(false);
    sendToParent(response);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        {/* <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h2>Are you sure</h2>
            <p>Do you want to delete project?</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} variant="outlined" color="warning">
            CANCEL
          </Button>
          <Button onClick={() => handleClose(true)} variant="outlined" color="success">
            CONFIRM
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
