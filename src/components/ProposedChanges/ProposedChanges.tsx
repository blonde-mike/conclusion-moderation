import React, { FC } from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material'


interface ProposedChangesProps {
  proposedList: any[],
  conclusionType: string
}

const ProposedChanges: FC<ProposedChangesProps> = ({proposedList, conclusionType}) => {
  return (
    <div>
      <Typography variant="h5">Proposed Changes ({proposedList.length})</Typography>
      <List>
        {proposedList.map((proposedListItem) => {
          return (
          <ListItem>
            {(conclusionType === 'birth' || conclusionType === 'death' || conclusionType === 'burial' || conclusionType === 'christening') && 
              <div>
                <ListItemText>Date: {proposedListItem.conclusion.date}</ListItemText>
                <ListItemText>Place: {proposedListItem.conclusion.place}</ListItemText>
                <ListItemText>Proposed by: {proposedListItem.contactName}</ListItemText>
              </div>
            }
            {(conclusionType === 'name') &&
              <div>
                <ListItemText>First Name: {proposedListItem.conclusion.date}</ListItemText>
                <ListItemText>Last Name: {proposedListItem.conclusion.place}</ListItemText>
                <ListItemText>Proposed by: {proposedListItem.contactName}</ListItemText>
              </div>}
          </ListItem>
          );
        })}
      </List>
    </div>
  )
};

export default ProposedChanges;
