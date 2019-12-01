import React, { Component } from 'react';
import BattleMenu from './BattleMenu';
import MenuContainer from './MenuContainer';
import CharacterBox from './CharacterBox';
import AttackOption from './AttackOption';
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
import { itemUse, throwBall, infoReset, damageOnOpponent, moreChangePoke,effectOnPlayer, damageOnPlayer, drainOnOpponent } from '../actions/pokemonActions';
// array to alias images to indexes so they can be referenced in store
const pokePics = [seadraSprite, pikachuSprite, charizardSprite, gengarSprite, hitmonleeSprite, ivysaurSprite, jigglypuffSprite, mewtwoSprite, onixSprite, pidgeotSprite, snorlaxSprite, eeveeSprite];
import BattleFrameCSS from './battleframe.css';

class BattleFrame extends Component {
  constructor(props) {
    super(props)
  }

  handleFightAction = (damage) => {
    const {effectOnPlayer, infoReset, damageOnOpponent, damageOnPlayer, opponent, selfWeakArm, opponentWeakArm } = this.props;
    //damages opponent, less a status effect that may be the result of an opponent attack.

    damageOnOpponent(damage + selfWeakArm);

    // Then you are hit.
    this.opponentPunchback();
  }

  handleDrainAction = () => {
    const {effectOnPlayer, infoReset, drainOnOpponent, damageOnPlayer, opponent, opponentWeakArm } = this.props;
    //You send off a drain action to reduce the ability of opponent to attack you.
    drainOnOpponent(30);
    // Then you are hit.
    this.opponentPunchback();
  }

  opponentPunchback = () => {
    const {effectOnPlayer, infoReset, damageOnPlayer, opponent, opponentWeakArm } = this.props;
    // Collect opponent attacks into an array.
    let setter = Object.entries(opponent.attacks);
    // Select a random attack.
    let move = setter[Math.floor(Math.random()*setter.length)];
    // Isolate name of attack.
    let name = move[0];
    // Isolate damage of attack.
    let damage = move[1];
    console.log(move);
    //setTimeout(() => {
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
    //}, 300);
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

  handleItem = (chosen) => {
    console.log('you touched an item!')
    const {items, player, itemUse, throwBall, opponent, toggleToWorld} = this.props;

    if (chosen.recover >= 1) itemUse(chosen);
    if (chosen.recover === -1) {throwBall({chosen, opponent});
      alert(`You caught a ${opponent.name}!`);
      toggleToWorld();
    }

    this.opponentPunchback();
  }

  changePoke = (iden) => {
    const { yourPokes, activePoke, moreChangePoke } = this.props;
    console.log('You want to change to ' + yourPokes[iden].name)
    moreChangePoke(iden);

    this.opponentPunchback();
  }

  itemList = () => {
    const {
      items,
    } = this.props;
    let itemBox = [], counter = 0;
    for (let item in items){
    counter++;
    if (items[item].count > 0){
    itemBox.push(<div onClick={() => this.handleItem(items[item])} key={"l"+counter}>{items[item].name+' x'+items[item].count}</div>)}
    };
    return itemBox;
  }

  pokeList = () => {
    const {
      yourPokes, activePoke
    } = this.props;
    let pokeBox = [], counter = 0;
    for (let i = 0; i < yourPokes.length; i++){
      counter++
      if (i != activePoke){
        pokeBox.push(<div onClick={() => this.changePoke(i)} key={"p"+counter}>{yourPokes[i].name}</div>)
      }
    }
    return pokeBox;
  }
  
  render() {
    const { 
      opponent,
      player,
      toggleToWorld,
      fightInfo,
      items,
      yourPokes,
      activePoke,
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
          pokemon={yourPokes[activePoke]}
          sprite={pokePics[yourPokes[activePoke].image]}
          getHealthPixels={this.getHealthPixels}
          isOpponent={false}
        />
        {/* BATTLE MENU */}
        <MenuContainer 
          toggleToWorld={toggleToWorld}
          handleFightAction={this.handleFightAction}
          handleDrainAction={this.handleDrainAction}
        />
        {/* <BattleMenu 
          handleFightAction={this.handleFightAction}
          toggleToWorld={toggleToWorld}
        /> */}
        {/* ATTACK TYPES */}
        {/* <div className="upper__box">
          <article className="frame__attack-menu">
            <div>Attacks</div>
            <div>{this.attackList()}</div>
          </article> */}
        {/* CHANGE POKEMON */}
          {/* <article className="frame__change-menu">
            <div>Pokemon</div>
            <div>{this.pokeList()}</div>
          </article>
        </div> */}
        
        {/* ITEMS */}
        {/* <article className="frame__item-menu">
          <div>Items</div>
          <div>{this.itemList()}</div>
        </article> */}

        {/* FIGHT INFO */}
        {/* <article className="frame_fight-info">
          <div>...</div>
          <div>{fightInfo}</div>
        </article> */}
      </main>
    )
  }
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { 
  itemUse,
  throwBall,
  infoReset,
  damageOnOpponent,
  effectOnPlayer,
  damageOnPlayer,
  drainOnOpponent,
  moreChangePoke,
})(BattleFrame);
