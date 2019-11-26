import React, { useState } from 'react';
import OverWorld from './OverWorldComponents/OverWorld';
import BattleFrame from './BattleWorldComponents/BattleFrame';
import BattleFrameCSS from './BattleWorldComponents/battleframe.css';


const App = () => {
  // world is 0, battle is 1
  // This hook creates worldOrBattle state that toggles between the two worlds
  // the toggleToBattle/World prop method will trigger the toggle
  const [worldOrBattle, setWorldOrBattle] = useState(0);

  // canvasRef to be passed as a prop to provide access to the canvas to children components
  const canvasRef = React.useRef(null);

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
export default App;
