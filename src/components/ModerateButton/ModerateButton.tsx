import React, { FC, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, Typography } from '@mui/material'
import { createModeration } from '../../moderator.service';

interface ModerateButtonProps {
  cisId: string,
  conclusionType: string,
  personId: string,
  moderator: string,
  isOwn: boolean
}

const ModerateButton: FC<ModerateButtonProps> = ({cisId, conclusionType, personId, moderator, isOwn}) => {
  const [openModerateNotice, setOpenModerateNotice] = useState(false);

  const handleModerateClick = () => {
    setOpenModerateNotice(true);
  }

  const handleCloseModerateDialog = () => {
    setOpenModerateNotice(false);
  }

  const handleConfirmModeration = () => {
    const moderatorInfo = {
      userId: cisId,
      contactName: moderator
    }

    let moderation: any = {};
    createModeration(personId, conclusionType, moderatorInfo)
    .then(results => {
      moderation = results;
      console.log(moderation);
      // moderator = moderation.con
      isOwn = true;
      setOpenModerateNotice(false);
    })

    console.log(cisId);
    console.log(conclusionType);
    console.log(personId);
    // Make a call to the backend to set moderation
  }
  
  return (
    <span>
      {moderator === '' && !isOwn &&
      <Button className="edit-button fs-button fs-button--minor fs-button--small"
      onClick={handleModerateClick}>
        Moderate
      </Button>}
      {isOwn && 
      <span>You are moderating this event.
        </span>}
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
