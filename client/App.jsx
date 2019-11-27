import React, { useState, useRef } from 'react';
import OverWorld from './OverWorldComponents/OverWorld';
import BattleWorld from './BattleWorldComponents/BattleWorld';

const App = () => {
  // world is 0, battle is 1
  // This hook creates worldOrBattle state that toggles between the two worlds
  // the toggleToBattle/World prop method will trigger the toggle
  const [worldOrBattle, setWorldOrBattle] = useState(1);


  // render
  return (
    <>
      {
        worldOrBattle ? (
          <OverWorld
            toggleToBattle={() => setWorldOrBattle(0)}
          />
        ) : '' // or render empty string
      }
      { !worldOrBattle ? (
        <BattleWorld
          toggleToWorld={() => setWorldOrBattle(1)}
        />
      ) : ''}
    </>
  );
};
export default App;
