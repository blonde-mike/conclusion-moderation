import React, { FC } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, TextField, Typography } from '@mui/material'

export default function ProposeChangeDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Propose a Change
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Changes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Make sure your changes are correct...
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="Edit"
            label="Conclusion Edit"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Commit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}