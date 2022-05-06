import React, { FC } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, Typography } from '@mui/material'
import { createProposedChange } from '../../moderator.service'


interface ProposeChangeButtonProps {
  conclusionType: string,
  personId: string,
  cisId: string,
  contactName: string,
  proposeChangeDialog: any
}

const ProposeChangeButton: FC<ProposeChangeButtonProps> = ({conclusionType, personId, cisId, contactName, proposeChangeDialog}) => {

  const handleProposeChange = () => {
    let proposed: any = {
      userId: cisId,
      contactName: contactName,
      conclusion: {}
    };
    if (conclusionType === "name") {
      proposed.conclusion.firstName = proposeChangeDialog?.querySelector('fs-tree-name-template')?.shadowRoot?.querySelector('input.first-name')?.value;
      proposed.conclusion.lastName = proposeChangeDialog?.querySelector('fs-tree-name-template')?.shadowRoot?.querySelector('input.last-name')?.value;
    } else {
      proposed.conclusion.date = proposeChangeDialog?.querySelector('birch-standards-picker[data-test-date-standard-picker]')?.shadowRoot?.querySelector('birch-typeahead')?.shadowRoot?.querySelector('input')?.value;
      proposed.conclusion.place = proposeChangeDialog?.querySelector('birch-standards-picker[data-test-place-standard-picker]')?.shadowRoot?.querySelector('birch-typeahead')?.shadowRoot?.querySelector('input')?.value;
    }

    let proposal: any = {};
    createProposedChange(personId, conclusionType, proposed)
    .then(results => {
      proposal = results;
      console.log(proposal);
      // setIsOwnLocal(true);
      // setOpenModerateNotice(false);
    })

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
