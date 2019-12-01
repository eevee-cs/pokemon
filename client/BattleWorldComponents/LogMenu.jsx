/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

const LogMenu = (props) => {
  const {
    fightInfo,
    handleOpponentAttack,
  } = props;

  return (
    <section
      className="frame__log-menu"
      onClick={handleOpponentAttack}
    >
      <div className="frame__log-row frame__log-row--top">
        {fightInfo[0]}
      </div>
      <div className="frame__log-row frame__log-row--bottom">
        {`used ${fightInfo[1]}!`}
      </div>
    </section>
  );
};

export default LogMenu;
