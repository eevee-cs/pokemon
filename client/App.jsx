import React, { useState, useRef } from 'react';
import OverWorld from './OverWorldComponents/OverWorld';
import BattleFrame from './BattleWorldComponents/BattleFrame';
import BattleFrameCSS from './BattleWorldComponents/battleframe.css';


const App = () => {
  // world is 0, battle is 1
  // This hook creates worldOrBattle state that toggles between the two worlds
  // the toggleToBattle/World prop method will trigger the toggle
  const [worldOrBattle, setWorldOrBattle] = useState(0);


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
      { !worldOrBattle && (
        <BattleFrame
          toggleToWorld={() => setWorldOrBattle(1)}
        />
      ) : ''}
    </>
  );
};
export default App;
