import React, { FC } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, Typography } from '@mui/material'


interface ProposedChangesProps {
  proposedList: any[]
}

const ProposedChanges: FC<ProposedChangesProps> = ({proposedList}) => (
  <div>
    <div className="last-changed--label">Proposed Changes ({proposedList.length})</div>
  </div>
);

export default ProposedChanges;
