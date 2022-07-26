import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Tooltip from '@mui/material/Tooltip';

export default function DeleteDialog({task, handleDeleteTask}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteButton = () => {
    handleClose()
    handleDeleteTask(task._id)
  }

  return (
    <div>
      <Tooltip title="Delete">
        <Button
          onClick={handleClickOpen}
        >
          <HighlightOffIcon/>
        </Button>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete Task?
        </DialogTitle>
        <DialogActions sx={{justifyContent: "center"}}>
          <Button 
            onClick={handleDeleteButton}
            variant="outlined"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}