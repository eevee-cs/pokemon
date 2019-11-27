import React, { useState } from 'react';
import { connect } from 'react-redux';
import OverWorld from './OverWorldComponents/OverWorld';
import BattleFrame from './BattleWorldComponents/BattleFrame';
import app from './app.css';
import { getRandomPokemon } from './actions/pokemonActions';

const App = (props) => {
  // world is 0, battle is 1
  // This hook creates worldOrBattle state that toggles between the two worlds
  // the toggleToBattle/World prop method will trigger the toggle
  const [worldOrBattle, setWorldOrBattle] = useState(0);

  // canvasRef to be passed as a prop to provide access to the canvas to children components
  const canvasRef = React.useRef(null);
  
  // sets a random Pokemon as an opponent to be used inside BattleFrame
  const { getRandomPokemon } = props;
  getRandomPokemon();
  // render
  return (
    <>
      {
        worldOrBattle && (
          <OverWorld
            canvasRef={canvasRef}
            toggleToBattle={() => setWorldOrBattle(0)}
          />
        )
      }
      { !worldOrBattle && (
        <BattleFrame
          toggleToWorld={() => setWorldOrBattle(1)}
        />
      )}
    </>
  );
};
export default connect(null, { getRandomPokemon })(App);
