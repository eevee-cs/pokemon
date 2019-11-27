import React, { Component } from 'react';
import BattleMenu from './BattleMenu';
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
import { infoReset, damageOnOpponent, effectOnPlayer, damageOnPlayer, drainOnOpponent } from '../actions/pokemonActions';
// array to alias images to indexes so they can be referenced in store
const pokePics = [seadraSprite, pikachuSprite, charizardSprite, gengarSprite, hitmonleeSprite, ivysaurSprite, jigglypuffSprite, mewtwoSprite, onixSprite, pidgeotSprite, snorlaxSprite];
import BattleFrameCSS from './battleframe.css';

class BattleFrame extends Component {
  constructor(props) {
    super(props)
  }

  handleFightAction = () => {
    const {effectOnPlayer, infoReset, damageOnOpponent, damageOnPlayer, opponent, selfWeakArm, opponentWeakArm } = this.props;
    //damages opponent, less a status effect that may be the result of an opponent attack
    damageOnOpponent(25+selfWeakArm);
    //collect opponent attacks in an array
    let setter = Object.entries(opponent.attacks);
    // Select a random attack.
    let move = setter[Math.floor(Math.random()*setter.length)];
    // Isolate name of attack.
    let name = move[0];
    // Isolate damage of attack.
    let damage = move[1];
    console.log(move);
    setTimeout(() => {
      // Declare name of opponent's attack.
      if (opponent.hp - 25 > 0) {
        infoReset(opponent.name+' just used '+name+'!')
      }
      // If opponent is giving a status attack (indicated by damage < 0), send appropriate action.
      if (opponent.hp - 25 > 0 && damage < 0) {
        effectOnPlayer(damage);
      }
      // Opponent attacks for damage, there is also a catch here so the damage cannot be less than 2.
      else if (opponent.hp - 25 > 0) {damageOnPlayer(2 > damage-opponentWeakArm ? 2 : damage-opponentWeakArm)}
    }, 400);
  }

  handleDrainAction = () => {
    const {effectOnPlayer, infoReset, drainOnOpponent, damageOnPlayer, opponent, opponentWeakArm } = this.props;
    //You send off a drain action to reduce the ability of opponent to attack you.
    drainOnOpponent(30);
    // The rest of this file is opponent's turn, so as handled in handleFightAction, this can be merged in.
    let setter = Object.entries(opponent.attacks);
    let move = setter[Math.floor(Math.random()*setter.length)];
    let name = move[0];
    let damage = move[1];
    console.log(move);
    setTimeout(() => {
      if (opponent.hp - 25 > 0) {
        infoReset(opponent.name+' just used '+name+'!')
      }
      if (opponent.hp - 25 > 0 && damage < 0) {
        effectOnPlayer(damage);
      } else if (opponent.hp - 25 > 0) {damageOnPlayer(2 > damage-opponentWeakArm ? 2 : damage-opponentWeakArm)}
    }, 400);
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
    const { player } = this.props;
    // You get a log if you have lost to an opponent.
    if (player.hp - damage <= 0) {
      console.log('You Lose');
    }
  }

  getHealthPixels = (currentPkmn) => {
    const { hp, maxHP } = currentPkmn;
    // Normalize health bar to fraction of maxHP.
    const healthPixels = Math.floor(99 * hp / maxHP);
    return healthPixels;
  }

  componentDidUpdate(prevProps) {
    if (this.props.opponent.hp <= 0) {
      // Helps check if opponent fainted.
      this.checkOpponentHealth(prevProps.opponent.hp - this.props.opponent.hp)
    }
    if (this.props.player.hp <= 0) {
      // Helps check if you fainted.
      this.checkPlayerHealth(prevProps.player.hp - this.props.player.hp)
    }
  }

  render() {
    const { 
      opponent,
      player,
      toggleToWorld,
      fightInfo
    } = this.props;

    return (
      <main className="frame">
        {/* OPPONENT FRAME BOX */}
        <CharacterBox
          pokemon={opponent}
          sprite={pokePics[opponent.image]}
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
        {/* ATTACK TYPES */}
        <article className="frame_attack-menu">
          <div>Attacks</div>
          <div onClick={this.handleFightAction}>TACKLE</div>
          <div onClick={this.handleDrainAction}>GROWL</div>
        </article>
        {/* FIGHT INFO */}
        <article className="frame_fight-info">
          <div>...</div>
          <div>{fightInfo}</div>
        </article>
      </main>
    )
  }
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { 
  infoReset,
  damageOnOpponent,
  effectOnPlayer,
  damageOnPlayer,
  drainOnOpponent,
})(BattleFrame);
