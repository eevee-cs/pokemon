import React, { Component } from 'react';
import pikachuSprite from '../assets/images/pikachu-front.png';
import eeveeSprite from '../assets/images/eevee-sprite.png';
import { connect } from 'react-redux';
import { damageOnOpponent, damageOnPlayer } from '../actions/pokemonActions';

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
        <article className="frame__box frame__box--opponent">
          <section className="frame__info">
            <h5 className="frame__name">Pikachu</h5>
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
            <img className="frame__sprite-img" src={pikachuSprite} alt=""/>
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
      </main>
    )
  }
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { damageOnOpponent, damageOnPlayer })(BattleFrame);
