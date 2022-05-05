import React, { FC, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, Typography } from '@mui/material'

interface ModerateButtonProps {
  cisId: string,
  conclusionType: string,
  personId: string
}

const ModerateButton: FC<ModerateButtonProps> = ({cisId, conclusionType, personId}) => {
  const [openModerateNotice, setOpenModerateNotice] = useState(false);

  const handleModerateClick = () => {
    setOpenModerateNotice(true);
  }

  const handleCloseModerateDialog = () => {
    setOpenModerateNotice(false);
  }

  const handleConfirmModeration = () => {
    // let userKey = findLocalItems(/prod-v2-user/);
    console.log(cisId);
    console.log(conclusionType);
    console.log(personId);
    // localStorage.getItem()
    setOpenModerateNotice(false);
  }
  
  return (
    <span>
      <Button className="edit-button fs-button fs-button--minor fs-button--small"
      onClick={handleModerateClick}>
        Moderate
      </Button>
      <Dialog onClose={handleCloseModerateDialog}
      open={openModerateNotice}
      sx={{
        width: 1500
      }}>
        <DialogTitle variant="h4">
          Moderating This Event
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            By clicking "Confirm", you agree to follow the Community Guidelines for moderation. Please be courteous and respectful in your interactions with other users.
            
            Thank you for moderating!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained"
          onClick={handleConfirmModeration}>Confirm</Button>
          <Button variant="outlined"
          onClick={handleCloseModerateDialog}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </span>
    
  )
};

export default ModerateButton;
