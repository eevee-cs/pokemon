import React, { Component } from 'react';
import { connect } from 'react-redux';
import BattleMenu from './BattleMenu';
import FightMenu from './FightMenu';
import LogMenu from './LogMenu';
import PkmnMenu from './PkmnMenu';
import ItemMenu from './ItemMenu';
import { BATTLE_MENU, FIGHT_MENU, ITEM_MENU, PKMN_MENU, LOG_MENU } from '../actions/constants';
import { infoReset, damageOnPlayer, effectOnPlayer, damageOnOpponent, drainOnOpponent, moreChangePoke, itemUse, throwBall } from '../actions/pokemonActions';

const mapStateToProps = (state) => {
  return {
    yourPokes: state.yourPokes,
    activePoke: state.activePoke,
    fightInfo: state.fightInfo,
    items: state.items,
    opponent: state.opponent,
    opponentWeakArm: state.opponentWeakArm,
  }
};

class MenuContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: BATTLE_MENU,
      opponentAttacked: false,
    };
  }

  switchMenu = (menu) => {
    this.setState({ menu });
  }

  handleOpponentAttack = () => {
    const { opponentAttacked } = this.state;
    // render BattleMenu after clicking on LogMenu during Opponent's Fight Log
    if (opponentAttacked) {
      return this.setState({ 
        menu: BATTLE_MENU,
        opponentAttacked: false, 
      });
    }
    // opponent attacks after clicking on LogMenu
    const { effectOnPlayer, infoReset, damageOnPlayer, opponent, opponentWeakArm } = this.props;
    // Collect opponent attacks into an array.
    let setter = Object.entries(opponent.attacks);
    // Select a random attack.
    let move = setter[Math.floor(Math.random() * setter.length)];
    // Isolate name of attack.
    let name = move[0];
    // Isolate damage of attack.
    let damage = move[1];

    // Declare name of opponent's attack.
    if (opponent.hp > 0) infoReset([`Enemy ${opponent.name.toUpperCase()}`, name.toUpperCase()]);
    // If opponent is giving a status attack (indicated by damage < 0), send appropriate action.
    if (opponent.hp > 0 && damage < 0) effectOnPlayer(damage);
    // Opponent attacks for damage, there is also a catch here so the damage cannot be less than 2.
    else if (opponent.hp > 0) damageOnPlayer(2 > damage - opponentWeakArm ? 2 : damage - opponentWeakArm)
    // render LogMenu with opponents attack info
    this.setState({ 
      menu: LOG_MENU,
      opponentAttacked: true,
    });
  }

  handleBackKey = (event) => {
    const { menu } = this.state;
    switch(event.keyCode) {
      case 37: {
        if (menu !== BATTLE_MENU) return this.setState({ menu: BATTLE_MENU });
      }
      default: {
        null
      }
    }
  }

  render() {
    const { menu } = this.state;
    const { 
      toggleToWorld,
      opponent,
      damageOnOpponent,
      drainOnOpponent,
      moreChangePoke,
      yourPokes,
      activePoke,
      fightInfo,
      infoReset,
      items,
      itemUse,
      throwBall,
    } = this.props;

    return (
      <article 
        className="frame__menu"
        onKeyDown={this.handleBackKey}
        tabIndex="0"
      >
        {/* Default Menu */}
        { menu === BATTLE_MENU ? <BattleMenu switchMenu={this.switchMenu} toggleToWorld={toggleToWorld}/> : null }
        {/* Fight Menu */}
        { 
          menu === FIGHT_MENU 
          ? 
            <FightMenu 
              yourPokes={yourPokes}
              activePoke={activePoke}
              infoReset={infoReset}
              switchMenu={this.switchMenu}
              handleFightAction={damageOnOpponent}
              handleDrainAction={drainOnOpponent}
            /> 
          : 
            null 
        }
        {/* Log Menu */}
        { menu === LOG_MENU ? <LogMenu fightInfo={fightInfo} handleOpponentAttack={this.handleOpponentAttack}/> : null }
        {/* PKMN Menu */}
        { menu === PKMN_MENU ? <PkmnMenu yourPokes={yourPokes} activePoke={activePoke} changePkmn={moreChangePoke} handleOpponentAttack={this.handleOpponentAttack} /> : null }
        {/* Item Menu */}
        { menu === ITEM_MENU ? <ItemMenu items={items} itemUse={itemUse} throwBall={throwBall} opponent={opponent} toggleToWorld={toggleToWorld} handleOpponentAttack={this.handleOpponentAttack} /> : null }
      </article>
    );
  }
}

export default connect(mapStateToProps, { 
  infoReset,
  damageOnPlayer,
  effectOnPlayer,
  damageOnOpponent,
  drainOnOpponent,
  moreChangePoke,
  itemUse,
  throwBall,
})(MenuContainer);
