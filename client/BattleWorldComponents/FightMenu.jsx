import React from 'react';
import AttackOption from './AttackOption';
import { LOG_MENU } from '../actions/constants';

const FightMenu = (props) => {
  const {
    yourPokes,
    activePoke,
    infoReset,
    switchMenu,
    handleFightAction,
    handleDrainAction,
  } = props;
  const activePokemonAttackList = yourPokes[activePoke].attacks;

  const handleAction = (attack, damage) => {
    // deal damage to opponent
    if (activePokemonAttackList[attack] > 0) handleFightAction(damage);
    else if (activePokemonAttackList[attack] < 0) handleDrainAction(damage);
    // render LogMenu with current attack info from your Pokemon
    infoReset([yourPokes[activePoke].name.toUpperCase(), attack.toUpperCase()]);
    // infoReset(`${yourPokes[activePoke].name.toUpperCase()} used ${attack.toUpperCase()}!`);
    switchMenu(LOG_MENU);
  };

  const generateAttackList = () => {
    return Object.keys(activePokemonAttackList).map((attack, i) => (
      <AttackOption
        key={"a" + i}
        // handleAction={activePokemonAttackList[attack] > 0 ? handleFightAction : handleDrainAction}
        handleAction={handleAction}
        attack={attack}
        damage={activePokemonAttackList[attack]}
      />
    ));
  };

  return (
    <section className="frame__fight-menu">
      {generateAttackList()}
    </section>
  );
};

export default FightMenu;
