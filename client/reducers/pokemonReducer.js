import * as constants from '../actions/constants';
import { pkmnList } from '../pokemonList';

const initialState = {
  pokesArray: pkmnList,
  gameWorld: 0,
  opponentWeakArm: 0,
  selfWeakArm: 0,
  fightInfo: [],
  items: {
    Potion: {
      name: 'Potion',
      count: 1,
      recover: 1,
    },
    Pokeball: {
      name: 'Pokeball',
      count: 2,
      recover: -1,
    },
  },
  opponent: pkmnList[1],
  player: pkmnList[0],
  activePoke: 0,
  yourPokes: [
    pkmnList[0],
  ],
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
      const newPlayerHP = (state.yourPokes[state.activePoke].hp - action.payload) >= 0 ? state.yourPokes[state.activePoke].hp - action.payload : 0;

      const newYourPoke = {
        ...state.yourPokes[state.activePoke],
        hp: newPlayerHP,
      };

      const newYourPokes = state.yourPokes;

      //console.log('what were we trying to update: ' + newYourPokes[0].hp);

      newYourPokes[state.activePoke] = newYourPoke;

      //console.log('they are trying to do damage:' + newYourPokes[0].hp);

      return {
        ...state,
        yourPokes: newYourPokes,
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
      const newOpponentWeakArm = 0;
      const newSelfWeakArm = 0;
      const newFightInfo = 'Getting ready!';
      return {
        ...state,
        opponent: randomPokemon,
        opponentWeakArm: newOpponentWeakArm,
        selfWeakArm: newSelfWeakArm,
        fightInfo: newFightInfo,
      };
    }
    case constants.SET_RANDOM_SELF: {
      const newActivePoke = Math.floor(Math.random() * state.yourPokes.length);

      return {
        ...state,
        activePoke: newActivePoke,
      };
    }
    case constants.ATTACK_INFO: {
      // showing name of opponent attack
      const newFightInfo = action.payload;

      return {
        ...state,
        fightInfo: newFightInfo,
      };
    }
    case constants.EFFECT_ATTACK: {
      // reducing self attack strength
      const newSelfWeakArm = state.selfWeakArm + action.payload;

      return {
        ...state,
        selfWeakArm: newSelfWeakArm,

      };
    }
    case constants.CHANGE_POKE: {
      const newActivePoke = action.payload;

      return {
        ...state,
        activePoke: newActivePoke,
      };
    }
    case constants.ITEM_USE: {
      const newInnerCount = state.items[action.payload.name].count-1;
      //dynamic passing
      const newItem = {
        ...state.items[action.payload.name],
        count: newInnerCount,
      };

      const mod = action.payload.recover > 0 ? action.payload.recover * 20 : 0;

      const newPlayerHP = Math.min(state.yourPokes[state.activePoke].hp + mod, state.yourPokes[state.activePoke].maxHP);

      // console.log('full bump: ' + (state.yourPokes[state.activePoke].hp + mod));

      // console.log('back to max: '+ state.yourPokes[state.activePoke].maxHP);

      const newItems = {
        ...state.items,
        [action.payload.name]: newItem,
      };

      const newYourPoke = {
        ...state.yourPokes[state.activePoke],
        hp: newPlayerHP,
      };

      // console.log('set up the new poke ' + newYourPoke.hp);

      const newYourPokes = state.yourPokes;

      newYourPokes[state.activePoke] = newYourPoke;

      //console.log(newYourPokes);

      return {
        ...state,
        items: newItems,
        yourPokes: newYourPokes,
      };
    }
    case constants.THROW_BALL: {
      console.log('Catch that pokemon!');
      const newInnerCount = state.items[action.payload.chosen.name].count-1;

      const newItem = {
        ...state.items[action.payload.chosen.name],
        count: newInnerCount,
      };

      const newPokes = state.yourPokes.concat(action.payload.opponent);

      const newItems = {
        ...state.items,
        [action.payload.chosen.name]: newItem,
      };

      console.log('myPokes ', state.yourPokes);
      return {
        ...state,
        items: newItems,
        yourPokes: newPokes,
      };
    }
    default: {
      return state;
    }
  }
};

export default pokemonReducer;
