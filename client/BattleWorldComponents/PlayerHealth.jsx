import React from 'react';

const PlayerHealth = ({ maxHP, hp }) => {
  return (
    <h5 className="frame__hp">
      <span className="frame__current-hp">
        { hp }
        /
      </span>
      <span className="frame__max-hp">{ maxHP }</span>
    </h5>
  );
};

export default PlayerHealth;
