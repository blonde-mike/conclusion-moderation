import React, { FC } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, Typography } from '@mui/material'


interface ProposeChangeButtonProps {}

const ProposeChangeButton: FC<ProposeChangeButtonProps> = () => {
  return (
    <span>
      <Button className="edit-button fs-button fs-button--minor fs-button--small"
      id="editButton"
      aria-haspopup="true"
      metrics-id="Edit Conclusion">
        <span aria-hidden="true">Propose A Change</span>
        <span className="sr-only">Edit Burial</span>
      </Button>
    </span>
  )
};

export default ProposeChangeButton;
