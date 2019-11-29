import React from 'react';

const PlayerHealth = (props) => {
  return (
    <section className="frame__hp">
      <span className="frame__current-hp">20/</span>
      <span className="frame__max-hp">20</span>
    </section>
  );
};

export default PlayerHealth;