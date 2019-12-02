import React from 'react';
import PokemonOption from './PokemonOption';

const PkmnMenu = (props) => {
  const {
    yourPokes,
    activePoke,
    changePkmn,
    handleOpponentAttack,
  } = props;

  const handleChangePkmn = (id) => {
    changePkmn(id);
    handleOpponentAttack();
  };

  const generatePokemonList = () => {
    const list = [];
    for (let i = 0; i < yourPokes.length; i++) {
      if (i !== activePoke) {
        list.push(
          <PokemonOption
            key={"p" + i}
            pkmn={yourPokes[i]}
            id={i}
            handleChangePkmn={handleChangePkmn}
          />,
        );
      }
    }
    return list;
  };

  return (
    <section className="frame__pkmn-menu">
      {generatePokemonList()}
    </section>
  );
};

export default PkmnMenu;
