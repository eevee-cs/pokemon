/**
 * The background is 24 cells by 24 cells
 * @param: grassArr is an array of strings of the format "<xCoordinate>,<yCoordinate>"
 */


import React, { useState, useEffect, useReducer } from 'react';
import './overworld.css';
import playerFront from '../assets/images/player-front.png';
import playerFrontLeft from '../assets/images/player-front-left.png';
import playerFrontRight from '../assets/images/player-front-right.png';
import playerBack from '../assets/images/player-back.png';
import playerBackLeft from '../assets/images/player-back-left.png';
import playerBackRight from '../assets/images/player-back-right.png';
import playerLefty from '../assets/images/player-left.png';
import playerLeftyWide from '../assets/images/player-left-wide.png';
import playerRighty from '../assets/images/player-right.png';
import playerRightyWide from '../assets/images/player-right-wide.png';
import playerSprites from '../assets/images/player-sprites.png';

const directionArray = [playerLefty, playerLeftyWide, playerBack, playerBackLeft, playerBack, playerBackRight, playerRighty, playerRightyWide, playerFront, playerFrontLeft, playerFront, playerFrontRight];

// Help store player location while in battleworld.
let outerA = 11;
let outerB = 11;

const Player = ({ grassArr, toggleToBattle }) => {
const [leftOffset, setLeftOffset] = useState(0);
const [topOffset, setTopOffset] = useState(0);

// ***********************************************************************************************
let playerAlias = playerFront;
const [[playerTop, playerLeft, direction], dispatchPlayerCoords] = useReducer(playerCoordReducer, [outerA, outerB, 8]);
// useReducer fucntion to set coordinates of player (array[x, y])
function playerCoordReducer(state, action) {
  switch (action.type) {
    // All ternary operators are used to "teleport" to the other edge if going through
    // the edge of canvas
    case 37: { // left
      outerB = state[1] !== 0 ? state[1] - 1 : 23;
      playerAlias = playerLefty;
    return [state[0], state[1] !== 0 ? state[1] - 1 : 23, state[2] === 0 ? 1 : 0];
    }
    case 38: { // up
      outerA = state[0] !== 0 ? state[0] - 1 : 23;
      playerAlias = playerBack;
      let temp = state[2] + 1;
      if (temp > 5 || temp < 3) temp = 2;
    return [state[0] !== 0 ? state[0] - 1 : 23, state[1], temp];
    }
    case 39: { // right
      outerB = state[1] !== 23 ? state[1] + 1 : 0;
      playerAlias = playerRighty;
    return [state[0], state[1] !== 23 ? state[1] + 1 : 0, state[2] === 6 ? 7 : 6];
    }
    case 40: { // down
      outerA = state[0] !== 0 ? state[0] + 1 : 0;
      playerAlias = playerFront;
      let temp = state[2] + 1;
      if (temp > 11 || temp < 9) temp = 8;
    return [state[0] !== 23 ? state[0] + 1 : 0, state[1], temp];
    }
    default:
      return new Error('error in player coordinate reducer function');
    }
  }
  
  
  // ***********************************************************************************************
  function battleProbabilityReducer(state) {
    // create a string to check if it is in the array
    const isOnGrass = grassArr.includes(`${playerLeft},${playerTop}`);
    let updatedProb;
    
    if (isOnGrass) {
      // grass, increase battleProbability by some amount 0 to 0.20
      updatedProb = state + Math.random() / 5;
    } else {
      // pavement, reduce battle probability by a small amount
      updatedProb = state - Math.random() / 10;
    }
    // if over 0.75, toggle to the battle world (passed in prop method)
    if (updatedProb > 0.75) toggleToBattle();
    
    // do not allow updatedProb to go below zero
    if (updatedProb < 0) updatedProb = 0;
    
    return updatedProb;
  }
  
  // console.log('toggleto battle', toggleToBattle);
  
  // eslint-disable-next-line no-unused-vars
  const [battleProbablity, dispatchBattleProb] = useReducer(battleProbabilityReducer, 0);
  
  console.log('battle probability', battleProbablity);
  
  // useEffect to render player (as a circle)
  useEffect(() => {
    // set the offsets of the canvas element (to adjust the player's coordinate renders)
    const canvasElement = document.querySelector('canvas');
    setLeftOffset(canvasElement.offsetLeft);
    setTopOffset(canvasElement.offsetTop);
    
    // function to pass to event listener
    const handleKeyDown = (code) => {
      // if keycode is an arrow (37 through 40), dispatch to reducer
      if (code.keyCode >= 37 && code.keyCode <= 40) {
        dispatchPlayerCoords({ type: code.keyCode });
        dispatchBattleProb();
      }
      // test if probabilty is high enough to switch screens
    };
    
    // TODO add throttle to arrow keys
    window.addEventListener('keydown', handleKeyDown);
    
    // returning a function in useEffect is run on component unmounting
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // render player with class "player", style is to set the CSS positioning inline
  return (
    <img
    src={directionArray[direction]}
    className="player"
      alt="player"
      style={{ left: `${playerLeft * 25 + leftOffset}px`, top: `${playerTop * 25 + topOffset}px` }}
    />
  );
};

export default Player;
