import React, { useState, useRef } from 'react';
import OverWorld from './OverWorldComponents/OverWorld';
import BattleWorld from './BattleWorldComponents/BattleWorld';

const App = () => {
  // world is 0, battle is 1
  // This hook creates worldOrBattle state that toggles between the two worlds
  // the toggleToBattle/World prop method will trigger the toggle
  const [worldOrBattle, setWorldOrBattle] = useState(1);

  // canvasRef to be passed as a prop to provide access to the canvas to children components
  // the useRef hook has an HTML element on it's current property, so when a variable is set to
  // canvasRef.current, methods on it are LITERALLY html element methods (i.e. canvas html
  // element methods)
  const canvasRef = useRef(null);

  // render
  return (
    <>
      <canvas
        ref={canvasRef}
        width={600}
        height={600}
      />
      {
        worldOrBattle ? (
          <OverWorld
            canvasRef={canvasRef}
            toggleToBattle={() => setWorldOrBattle(0)}
          />
        ) : '' // or render empty string
      }
      { !worldOrBattle ? (
        <BattleWorld
          canvasRef={canvasRef}
          toggleToWorld={() => setWorldOrBattle(1)}
        />
      ) : ''}
    </>
  );
};
export default App;
