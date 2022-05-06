import React, { FC } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, Typography } from '@mui/material'


interface ProposeChangeButtonProps {
  conclusionType: string,
  proposeChangeDialog: any
}

const ProposeChangeButton: FC<ProposeChangeButtonProps> = ({conclusionType, proposeChangeDialog}) => {

  const handleProposeChange = () => {
    if (conclusionType === "name") {
      let firstName = proposeChangeDialog.querySelector('input[part="firstName"]').innerHTML;
      console.log(firstName);
    }
  }

  return (
    <span>
      <Button className="fs-button fs-button--recommended "
      type="button"
      onClick={handleProposeChange}>
        Propose Change
      </Button>
    </span>
  )
};

export default ProposeChangeButton;
