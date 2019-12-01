import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import OverWorld from './OverWorldComponents/OverWorld';
import BattleFrame from './BattleWorldComponents/BattleFrame';
import app from './app.css';
import { getRandomPokemon, getRandomSelf } from './actions/pokemonActions';

const App = (props) => {
  // world is 0, battle is 1
  // This hook creates worldOrBattle state that toggles between the two worlds
  // the toggleToBattle/World prop method will trigger the toggle
  const [worldOrBattle, setWorldOrBattle] = useState(0);


  // sets a random Pokemon as an opponent to be used inside BattleFrame
  if (worldOrBattle) { props.getRandomPokemon();
    props.getRandomSelf();
  }
  // render
  return (
    <>
      { worldOrBattle
          && (
          <OverWorld
            toggleToBattle={() => setWorldOrBattle(0)}
          />
          )}
      { !worldOrBattle ? (
        <BattleFrame
          toggleToWorld={() => setWorldOrBattle(1)}
        />
      ) : ''}
    </>
  );
};
export default connect(null, { getRandomPokemon, getRandomSelf })(App);
