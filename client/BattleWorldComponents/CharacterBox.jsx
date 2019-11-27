import React from 'react';

const classNames = {
  // used to control the CSS positioning & health bar for an opponent
  opponentFrame: 'frame__box frame__box--opponent',
  opponentHealth: 'frame__health-bar-inner frame__health-bar-inner--opponent',
  // used to control the CSS positioning & health bar for the player
  playerFrame: 'frame__box frame__box--player',
  playerHealth: 'frame__health-bar-inner frame__health-bar-inner--player',
};

const CharacterBox = (props) => {
  const {
    pokemon,
    sprite,
    getHealthPixels,
    isOpponent,
  } = props;

  return (
    <article className={isOpponent ? classNames.opponentFrame : classNames.playerFrame}>
      <section className="frame__info">
        <h5 className="frame__name">{pokemon.name}</h5>
        <section className="frame__stats">
          <h5 className="frame__health">HP</h5>
          <div className="frame__health-bar">
            <div
              className={isOpponent ? classNames.opponentHealth : classNames.playerHealth}
              style={{ width: getHealthPixels(pokemon) }}
            />
          </div>
        </section>
      </section>

      <section className="frame__sprite">
        <img className="frame__sprite-img" src={sprite} alt="" />
      </section>
    </article>
  );
};

export default CharacterBox;
