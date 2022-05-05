import React, { FC } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, Typography } from '@mui/material'


interface ProposeChangeButtonProps {}

const ProposeChangeButton: FC<ProposeChangeButtonProps> = () => {
  return (
    <span>
      <Button className="edit-button fs-button fs-button--minor fs-button--small">
        Propose A Change
      </Button>
    </span>
  )
};

export default ProposeChangeButton;
