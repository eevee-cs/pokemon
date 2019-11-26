import * as constants from '../actions/constants';

const initialState = {
  gameWorld: 0,
  opponent: {
    maxHP: 80,
    hp: 80,
    name: 'Pikachu',
  },
  player: {
    maxHP: 256,
    hp: 256,
    name: 'Eevee',
  },
};

const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.OPPONENT_DAMAGE:
      // subtracting damage taken from current HP
      const newHP = state.opponent.hp - action.payload;

      const newOpponent = {
        ...state.opponent,
        hp: newHP,
      }
      return {
        ...state,
        opponent: newOpponent,
      };
    case constants.PLAYER_DAMAGE:
      // subtracting damage taken from current HP
      const newPlayerHP = state.player.hp - action.payload;

      const newPlayer = {
        ...state.player,
        hp: newPlayerHP,
      }
      return {
        ...state,
        player: newPlayer,
      };
    default:
      return state;
  }
};

export default pokemonReducer;
