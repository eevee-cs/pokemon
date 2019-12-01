import React, { Component } from 'react';
import BattleMenu from './BattleMenu';
import FightMenu from './FightMenu';
import { BATTLE_MENU, FIGHT_MENU, ITEM_MENU, PKMN_MENU } from '../actions/constants';

class MenuContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: BATTLE_MENU,
    };
  }

  switchMenu = (menu) => {
    this.setState({ menu });
  }

  render() {
    const { menu } = this.state;
    const { 
      toggleToWorld,
      attackList,
      handleFightAction,
      handleDrainAction,
    } = this.props;

    return (
      <article className="frame__menu">
        { menu === BATTLE_MENU ? <BattleMenu switchMenu={this.switchMenu} toggleToWorld={toggleToWorld}/> : null }
        { menu === FIGHT_MENU ? <FightMenu attackList={attackList} handleFightAction={handleFightAction} handleDrainAction={handleDrainAction}/> : null }
      </article>
    );
  }
}

export default MenuContainer;
