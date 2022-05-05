import React, { FC } from 'react';


interface ModeratedByProps {
  moderatorName: string;
}

const ModeratedBy: FC<ModeratedByProps> = ({moderatorName}) => (
  <span>
    Moderated by {moderatorName}
  </span>
);

export default ModeratedBy;
