/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

const BattleMenu = (props) => {
  const { handleFightAction, toggleToWorld } = props;

  return (
    <article className="frame__battle-menu">
      <section className="frame__options">
        {/* Fight Option */}
        <div
          onClick={handleFightAction}
          className="frame__button"
          role="button"
          tabIndex={0}
        >
          FIGHT
        </div>
        {/* Party Option */}
        <div
          className="frame__button frame__button--padding"
          role="button"
          tabIndex={0}
        >
          PKMN
        </div>
        {/* Items Option */}
        <div
          className="frame__button"
          role="button"
          tabIndex={0}
        >
          ITEM
        </div>
        {/* Run Option */}
        <div
          onClick={toggleToWorld}
          className="frame__button frame__button--padding"
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
