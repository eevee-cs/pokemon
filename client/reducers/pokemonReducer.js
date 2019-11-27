import * as constants from '../actions/constants';

const initialState = {
  pokesArray: [{
    maxHP: 80,
    hp: 80,
    name: 'Pikachu',
    image: 1,
  },
  {
    maxHP: 120,
    hp: 120,
    name: 'Seadra',
    image: 0,
  }],
  gameWorld: 0,
  opponentWeakArm: 0,
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
    case constants.OPPONENT_DAMAGE: {
      // subtracting damage taken from current HP
      const newHP = (state.opponent.hp - action.payload) >= 0 ? state.opponent.hp - action.payload : 0;

      const newOpponent = {
        ...state.opponent,
        hp: newHP,
      }
      return {
        ...state,
        opponent: newOpponent,
      };
    }
    case constants.PLAYER_DAMAGE: {
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
    }
    case constants.OPPONENT_DRAIN: {
      // reducing opponent attack strength
      const newOpponentWeakArm = state.opponentWeakArm + action.payload;

      return {
        ...state,
        opponentWeakArm: newOpponentWeakArm,
      };
    }
    case constants.SET_RANDOM_POKEMON: {
      // setting a randomized Pokemon as the next encounter
      const randomPokemon = state.pokesArray[Math.floor(Math.random() * state.pokesArray.length)];
      return {
        ...state,
        opponent: randomPokemon,
      };
    }
    default: {
      return state;
    }
  }
};

export default pokemonReducer;
