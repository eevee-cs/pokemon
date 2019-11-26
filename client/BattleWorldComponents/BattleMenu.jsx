/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

const BattleMenu = (props) => {
  const { handleFightAction, toggleToWorld } = props;

  return (
    <article className="frame__battle-menu">
      <section className="frame__options">
        <div
          onClick={handleFightAction}
          className="frame__button"
          role="button"
          tabIndex={0}
        >
          FIGHT
        </div>
        <div
          className="frame__button"
          role="button"
          tabIndex={0}
        >
          PKMN
        </div>
        <div 
          className="frame__button"
          role="button"
          tabIndex={0}
        >
          ITEM
        </div>
        <div
          onClick={toggleToWorld}
          className="frame__button"
          role="button"
          tabIndex={0}
        >
          RUN
        </div>
      </section>
    </article>
  );
};

export default BattleMenu;
