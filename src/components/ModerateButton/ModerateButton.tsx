import React, { FC } from 'react';


interface ModerateButtonProps {}

const ModerateButton: FC<ModerateButtonProps> = () => {
  
  return (
    <button className="edit-button fs-button fs-button--minor fs-button--small">
      Moderate
    </button>
  )
};

export default ModerateButton;
