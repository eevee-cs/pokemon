import React, { Component } from 'react';
import BattleMenu from './BattleMenu';
import CharacterBox from './CharacterBox';
import pikachuSprite from '../assets/images/pikachu-front.png';
import eeveeSprite from '../assets/images/eevee-sprite.png';
import { connect } from 'react-redux';
import { damageOnOpponent, damageOnPlayer } from '../actions/pokemonActions';
import BattleFrameCSS from './battleframe.css';

class BattleFrame extends Component {
  constructor(props) {
    super(props)
  }

  handleFightAction = () => {
    const { damageOnOpponent, damageOnPlayer, opponent } = this.props;
    damageOnOpponent(25);
    setTimeout(() => {
      if (opponent.hp - 25 > 0) damageOnPlayer(10)
    }, 400);
  }

  checkOpponentHealth = (damage, id) => {
    const { opponent, toggleToWorld } = this.props;
    if (opponent.hp - damage <= 0) {
      clearTimeout(id);
      console.log('You Win');
      toggleToWorld();
    }
  }

  checkPlayerHealth = (damage) => {
    const { player } = this.props;
    if (player.hp - damage <= 0) {
      console.log('You Lose');
    }
  }

  getHealthPixels = (currentPkmn) => {
    const { hp, maxHP } = currentPkmn;
    const healthPixels = Math.floor(99 * hp / maxHP);
    return healthPixels;
  }

  componentDidUpdate(prevProps) {
    if (this.props.opponent.hp <= 0) {
      this.checkOpponentHealth(prevProps.opponent.hp - this.props.opponent.hp)
    }
    if (this.props.player.hp <= 0) {
      this.checkPlayerHealth(prevProps.player.hp - this.props.player.hp)
    }

  }

  render() {
    const { opponent, player, toggleToWorld } = this.props;
    return (
      <main className="frame">
        {/* OPPONENT FRAME BOX */}
        <CharacterBox
          pokemon={opponent}
          sprite={pikachuSprite}
          getHealthPixels={this.getHealthPixels}
          isOpponent={true}
        />
        {/* PLAYER FRAME BOX */}
        <CharacterBox
          pokemon={player}
          sprite={eeveeSprite}
          getHealthPixels={this.getHealthPixels}
          isOpponent={false}
        />
        {/* BATTLE MENU */}
        <BattleMenu 
          handleFightAction={this.handleFightAction} 
          toggleToWorld={toggleToWorld}
        />
      </main>
    )
  }
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { damageOnOpponent, damageOnPlayer })(BattleFrame);
