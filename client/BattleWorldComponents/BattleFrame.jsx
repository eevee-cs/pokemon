import React, { Component } from 'react';
import pikachuSprite from '../assets/images/pikachu-front.png';
import eeveeSprite from '../assets/images/eevee-sprite.png';

class BattleFrame extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <main className="frame">
        {/* OPPONENT FRAME BOX */}
        <article className="frame__box frame__box--opponent">
          <section className="frame__info">
            <h5 className="frame__name">Pikachu</h5>
            <section className="frame__stats">
              <h5 className="frame__health">HP</h5>
              <div className="frame__health-bar">
                <div className="frame__health-bar-inner"></div>
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
                <div className="frame__health-bar-inner"></div>
              </div>
            </section>
          </section>

          <section className="frame__sprite">
            <img className="frame__sprite-img" src={eeveeSprite} alt=""/>
          </section>
        </article>

        <article className="frame__battle-menu">
          
        </article>
      </main>
    )
  }
};

export default BattleFrame;
