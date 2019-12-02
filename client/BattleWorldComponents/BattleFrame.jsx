import React, { Component } from 'react';
import MenuContainer from './MenuContainer';
import CharacterBox from './CharacterBox';
import pikachuSprite from '../assets/images/pikachu-front.png';
import seadraSprite from '../assets/images/seadra-front.png';
import eeveeSprite from '../assets/images/eevee-sprite.png';
import charizardSprite from '../assets/images/charizard-front.png';
import gengarSprite from '../assets/images/gengar-front.png';
import hitmonleeSprite from '../assets/images/hitmonlee-front.png';
import ivysaurSprite from '../assets/images/ivysaur-front.png';
import jigglypuffSprite from '../assets/images/jigglypuff-front.png';
import mewtwoSprite from '../assets/images/mewtwo-front.png';
import onixSprite from '../assets/images/onix-front.png';
import pidgeotSprite from '../assets/images/pidgeot-front.png';
import snorlaxSprite from '../assets/images/snorlax-front.png';
import { connect } from 'react-redux';
// array to alias images to indexes so they can be referenced in store
const pokePics = [seadraSprite, pikachuSprite, charizardSprite, gengarSprite, hitmonleeSprite, ivysaurSprite, jigglypuffSprite, mewtwoSprite, onixSprite, pidgeotSprite, snorlaxSprite, eeveeSprite];
import BattleFrameCSS from './battleframe.css';

class BattleFrame extends Component {
  constructor(props) {
    super(props)
  }

  checkOpponentHealth = (damage, id) => {
    const { opponent, toggleToWorld } = this.props;
    // You get a log if you have defeated an opponent.
    if (opponent.hp - damage <= 0) {
      clearTimeout(id);
      console.log('You Win');
      toggleToWorld();
    }
  }

  checkPlayerHealth = (damage) => {
    const { player, yourPokes, activePoke } = this.props;
    // You get a log if you have lost to an opponent.
    if (yourPokes[activePoke].hp - damage <= 0) {
      alert('You Lose');
    }
  }

  getHealthPixels = (currentPkmn) => {
    const { hp, maxHP } = currentPkmn;
    console.log("currentPkmn: ", currentPkmn)
    // Normalize health bar to fraction of maxHP.
    const healthPixels = Math.floor(146 * hp / maxHP);
    return healthPixels;
  }

  componentDidUpdate(prevProps) {
    if (this.props.opponent.hp <= 0) {
      // Helps check if opponent fainted.
      this.checkOpponentHealth(prevProps.opponent.hp - this.props.opponent.hp)
    }
    if (this.props.yourPokes[this.props.activePoke].hp <= 0) {
      // Helps check if you fainted.
      this.checkPlayerHealth(prevProps.yourPokes[this.props.activePoke].hp - this.props.yourPokes[this.props.activePoke].hp)
    }
  }
  
  render() {
    const { 
      opponent,
      toggleToWorld,
      yourPokes,
      activePoke,
    } = this.props;


    return (
      <main className="frame">
        {/* OPPONENT FRAME BOX */}
        <CharacterBox
          pokemon={opponent}
          sprite={opponent.image.front}
          getHealthPixels={this.getHealthPixels}
          isOpponent={true}
        />
        {/* PLAYER FRAME BOX */}
        <CharacterBox
          pokemon={yourPokes[activePoke]}
          sprite={yourPokes[activePoke].image.back}
          getHealthPixels={this.getHealthPixels}
          isOpponent={false}
        />
        {/* BATTLE MENU */}
        <MenuContainer 
          toggleToWorld={toggleToWorld}
        />
      </main>
    )
  }
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(BattleFrame);
