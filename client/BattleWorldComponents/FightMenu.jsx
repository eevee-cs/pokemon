import React from 'react';
import { connect } from 'react-redux';
import AttackOption from './AttackOption';

const mapStateToProps = ({ yourPokes, activePoke }) => ({ yourPokes, activePoke });

const FightMenu = (props) => {
  const generateAttackList = () => {
    const {
      yourPokes,
      activePoke,
      handleFightAction,
      handleDrainAction,
    } = props;
    const activePokemonAttackList = yourPokes[activePoke].attacks;
    return Object.keys(activePokemonAttackList).map((attack, i) => (
      <AttackOption
        key={"a" + i}
        handleAction={activePokemonAttackList[attack] > 0 ? handleFightAction : handleDrainAction}
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

export default connect(mapStateToProps)(FightMenu);
