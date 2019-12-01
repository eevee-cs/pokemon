/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

const AttackOption = (props) => {
  const { handleAction, attack, damage } = props;
  // handleAction invokes handleFightAction for moves with damage
  // or handleDrainAction for status effect moves
  return (
    <div
      className="frame__attack-option"
      onClick={() => handleAction(damage)}
      role="button"
      tabIndex={0}
    >
      {attack}
    </div>
  );
};

export default AttackOption;
