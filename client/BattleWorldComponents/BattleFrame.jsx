import React, { Component } from 'react';
import pikachuSprite from '../assets/images/pikachu-front.png';
import seadraSprite from '../assets/images/seadra-front.png';
import eeveeSprite from '../assets/images/eevee-sprite.png';
import charizardSprite from '../assets/images/charizard-front.png';
import gengarSprite from '../assets/images/gengar-front.png';
import hitmonleeSprite from '../assets/images/hitmonlee-front.png';
import ivysaurSprite from '../assets/images/ivysaur-front.png';
import jigglypuffSprite from '../assets/images/jigglypuff-front.png';
import mewtwoSprite from '../assets/images/mewtwo-front.png';
import { connect } from 'react-redux';
import { damageOnOpponent, damageOnPlayer, drainOnOpponent } from '../actions/pokemonActions';
const pokePics = [seadraSprite, pikachuSprite, charizardSprite, gengarSprite, hitmonleeSprite, ivysaurSprite, jigglypuffSprite, mewtwoSprite];

class BattleFrame extends Component {
  constructor(props) {
    super(props)
  }

  handleFightAction = () => {
    const { damageOnOpponent, damageOnPlayer, opponent, opponentWeakArm } = this.props;
    damageOnOpponent(25);
    setTimeout(() => {
      if (opponent.hp - 25 > 0) damageOnPlayer(2 > 50-opponentWeakArm ? 2 : 50-opponentWeakArm)
    }, 400);
  }

  handleDrainAction = () => {
    const { drainOnOpponent, damageOnPlayer, opponent, opponentWeakArm } = this.props;
    drainOnOpponent(30);
    setTimeout(() => {
      if (opponent.hp - 25 > 0) damageOnPlayer(2 > 50-opponentWeakArm ? 2 : 50-opponentWeakArm)
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
        <article className="frame__box frame__box--opponent">
          <section className="frame__info">
            <h5 className="frame__name">{opponent.name}</h5>
            <section className="frame__stats">
              <h5 className="frame__health">HP</h5>
              <div className="frame__health-bar">
                <div 
                  className="frame__health-bar-inner frame__health-bar-inner--opponent"
                  style={{width: this.getHealthPixels(opponent)}}
                  ></div>
              </div>
            </section>
          </section>

          <section className="frame__sprite">
            <img className="frame__sprite-img" src={pokePics[opponent.image]} alt=""/>
          </section>
        </article>
        {/* PLAYER FRAME BOX */}
        <article className="frame__box frame__box--player">
          <section className="frame__info">
            <h5 className="frame__name">Eevee</h5>
            <section className="frame__stats">
              <h5 className="frame__health">HP</h5>
              <div className="frame__health-bar">
                <div 
                  className="frame__health-bar-inner frame__health-bar-inner--player"
                  style={{width: this.getHealthPixels(player)}}
                  ></div>
              </div>
            </section>
          </section>

          <section className="frame__sprite">
            <img className="frame__sprite-img" src={eeveeSprite} alt=""/>
          </section>
        </article>
        {/* BATTLE MENU */}
        <article className="frame__battle-menu">
          <section className="frame__options">
            <div
              onClick={this.handleFightAction}
              className="frame__button">FIGHT</div>
            <div className="frame__button">PKMN</div>
            <div className="frame__button">ITEM</div>
            <div
              onClick={toggleToWorld}
              className="frame__button">RUN</div>
          </section>
        </article>
        {/* ATTACK TYPES */}
        <article className="frame_attack-menu">
          <div>Attacks</div>
          <div onClick={this.handleFightAction}>TACKLE</div>
          <div onClick={this.handleDrainAction}>TAIL WAG</div>
        </article>
      </main>
    )
  }
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { damageOnOpponent, damageOnPlayer, drainOnOpponent })(BattleFrame);
