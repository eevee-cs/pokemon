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
      {fightInfo}
    </section>
  );
};

export default LogMenu;