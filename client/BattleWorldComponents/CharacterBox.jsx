import React from 'react';
import PlayerHealth from './PlayerHealth';

const classNames = {
  // used to control the CSS positioning & health bar for an opponent
  opponentFrame: 'frame__box frame__box--opponent',
  opponentHealth: 'frame__health-bar-inner frame__health-bar-inner--opponent',
  opponentStats: 'frame__stats frame__stats--opponent',
  opponentSprite: 'frame__sprite frame__sprite--opponent',
  // used to control the CSS positioning & health bar for the player
  playerFrame: 'frame__box frame__box--player',
  playerHealth: 'frame__health-bar-inner frame__health-bar-inner--player',
  playerStats: 'frame__stats frame__stats--player',
  playerSprite: 'frame__sprite frame__sprite--player',
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
        <h5 className="frame__level">
          <span className="frame__level--size">:L</span>
          5
        </h5>
        {/* HP Bar */}
        <section className={isOpponent ? classNames.opponentStats : classNames.playerStats}>
          <h5 className="frame__health">HP:</h5>
          <div className="frame__health-bar">
            <div
              className={isOpponent ? classNames.opponentHealth : classNames.playerHealth}
              style={{ width: getHealthPixels(pokemon) }}
            />
          </div>
        </section>
        {/* Players HP Display */}
        { isOpponent ? null : <PlayerHealth hp={pokemon.hp} maxHP={pokemon.maxHP} /> }
      </section>

      <section className={isOpponent ? classNames.opponentSprite : classNames.playerSprite}>
        <img className="frame__sprite-img" src={sprite} alt="" />
      </section>
    </article>
  );
};

export default CharacterBox;
