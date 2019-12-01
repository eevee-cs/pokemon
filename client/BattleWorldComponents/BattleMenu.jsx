/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { FIGHT_MENU, ITEM_MENU, PKMN_MENU } from '../actions/constants';

const BattleMenu = (props) => {
  const { toggleToWorld, switchMenu } = props;

  return (
    <section className="frame__options">
      {/* Fight Option */}
      <div
        className="frame__button"
        onClick={() => switchMenu(FIGHT_MENU)}
        role="button"
        tabIndex={0}
      >
        FIGHT
      </div>
      {/* Party Option */}
      <div
        className="frame__button frame__button--padding"
        onClick={() => switchMenu(PKMN_MENU)}
        role="button"
        tabIndex={0}
      >
        PKMN
      </div>
      {/* Items Option */}
      <div
        className="frame__button"
        onClick={() => switchMenu(ITEM_MENU)}
        role="button"
        tabIndex={0}
      >
        ITEM
      </div>
      {/* Run Option */}
      <div
        className="frame__button frame__button--padding"
        onClick={toggleToWorld}
        role="button"
        tabIndex={0}
      >
        RUN
      </div>
    </section>
  );
};

export default BattleMenu;
