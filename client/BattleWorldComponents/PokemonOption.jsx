/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

const PokemonOption = (props) => {
  const {
    pkmn,
    handleChangePkmn,
    id,
  } = props;

  return (
    <div
      className="frame__pkmn-option"
      onClick={() => handleChangePkmn(id)}
      role="button"
      tabIndex={0}
    >
      {pkmn.name}
      <span className="frame__pkmn-hp">
        {pkmn.hp}
        /
        {pkmn.maxHP}
      </span>
    </div>
  );
};

export default PokemonOption;
