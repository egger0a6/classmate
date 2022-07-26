import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteAllDialog({handleDeleteAll}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteButton = () => {
    handleClose()
    handleDeleteAll()
  }

  return (
    <div>
      <Button
        variant="text"
        onClick={handleClickOpen}
        color="error"
      >
        DELETE ALL TASKS
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          DELETE ALL TASKS?
        </DialogTitle>
        <DialogActions sx={{justifyContent: "center"}}>
          <Button 
            onClick={handleDeleteButton}
            variant="outlined"
            color="error"
          >
            DELETE ALL
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}