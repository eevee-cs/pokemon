import React from 'react';
import Background from './Background';
import Player from './Player';

const grassArr = Array(160).fill(null);
for (let i = 0; i < 160; i++) {
  const x = Math.floor(Math.random() * 24);
  const y = Math.floor(Math.random() * 24);
  const str = `${x},${y}`;
  grassArr[i] = str;
}

const OverWorld = ({ canvasRef, toggleToBattle }) => (
  <>
    {/* <button type="button" onClick={toggleToBattle}>im a button</button> */}
    <br />
    <Background grassArr={grassArr} />
    <Player grassArr={grassArr} toggleToBattle={() => toggleToBattle()} />
  </>
);

export default OverWorld;
