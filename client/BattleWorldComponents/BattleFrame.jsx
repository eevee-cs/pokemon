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
import { itemUse, throwBall, infoReset, damageOnOpponent, effectOnPlayer, damageOnPlayer, drainOnOpponent } from '../actions/pokemonActions';
// array to alias images to indexes so they can be referenced in store
const pokePics = [seadraSprite, pikachuSprite, charizardSprite, gengarSprite, hitmonleeSprite, ivysaurSprite, jigglypuffSprite, mewtwoSprite, onixSprite, pidgeotSprite, snorlaxSprite, eeveeSprite];
import BattleFrameCSS from './battleframe.css';

class BattleFrame extends Component {
  constructor(props) {
    super(props)
  }

  handleFightAction = () => {
    const {effectOnPlayer, infoReset, damageOnOpponent, damageOnPlayer, opponent, selfWeakArm, opponentWeakArm } = this.props;
    //damages opponent, less a status effect that may be the result of an opponent attack.

    damageOnOpponent(25+selfWeakArm);

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
    const healthPixels = Math.floor(99 * hp / maxHP);
    console.log('const health pixels', healthPixels)
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

    // if (chosen.recover >= 1){
      //console.log('hp',player.hp)
      // use reducer!
      // player.hp += 20*chosen.recover
      // console.log('hp',player.hp)
      // if (player.hp > player.maxHP){
      //   player.hp = player.maxHP;
      // };
      //chosen.count -= 1;
    // };
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

  attackList = () => {
    const {
      yourPokes, activePoke
    } = this.props;
    let attackBox = [], counter = 0;
    for (let attack in yourPokes[activePoke].attacks){
      counter++;
      if (yourPokes[activePoke].attacks[attack] > 0){
      attackBox.push(<div onClick={this.handleFightAction} key={"a"+counter}>{attack.toUpperCase()}</div>)
      } else if (yourPokes[activePoke].attacks[attack] < 0){
        attackBox.push(<div onClick={this.handleDrainAction} key={"a"+counter}>{attack.toUpperCase()}</div>)
      }
      
    };
    return attackBox;

  }

  pokeList = () => {
    const {
      yourPokes, activePoke
    } = this.props;
    let pokeBox = [], counter = 0;
    for (let i = 0; i < yourPokes.length; i++){
      counter++
      if (i != activePoke){
        pokeBox.push(<div key={"p"+counter}>{yourPokes[i].name}</div>)
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
        <BattleMenu 
          handleFightAction={this.handleFightAction}
          toggleToWorld={toggleToWorld}
        />
        {/* ATTACK TYPES */}
        <div className="upper_box">
        <article className="frame_attack-menu">
          <div>Attacks</div>
          <div>{this.attackList()}</div>
        </article>
        {/* CHANGE POKEMON */}
        <article className="frame_change-menu">
          <div>Pokemon</div>
          <div>{this.pokeList()}</div>
        </article>
        </div>
        {/* ITEMS */}
        <article className="frame_item-menu">
          <div>Items</div>
          <div>{this.itemList()}</div>
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
  itemUse,
  throwBall,
  infoReset,
  damageOnOpponent,
  effectOnPlayer,
  damageOnPlayer,
  drainOnOpponent,
})(BattleFrame);
