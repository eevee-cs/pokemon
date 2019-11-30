import * as constants from '../actions/constants';

const initialState = {
  pokesArray: [{
    maxHP: 80,
    hp: 80,
    attacks: {
      'Thunder Shock': 7,
      'Thunder Wave': -1,
    },
    name: 'Pikachu',
    image: 1,
  },
  {
    maxHP: 120,
    hp: 120,
    attacks: {
      'Hydro Pump': 7,
      Whirlpool: -1,
    },
    name: 'Seadra',
    image: 0,
  },
  {
    maxHP: 120,
    hp: 120,
    attacks: {
      'Fire Spin': 7,
      'Fire Blast': -1,
    },
    name: 'Charizard',
    image: 2,
  },
  {
    maxHP: 120,
    hp: 120,
    attacks: {
      'Shadow Ball': 7,
      Curse: -1,
    },
    name: 'Gengar',
    image: 3,
  },
  {
    maxHP: 120,
    hp: 120,
    attacks: {
      'Hi Jump Kick': 7,
      Mediate: -1,
    },
    name: 'Hitmonlee',
    image: 4,
  },
  {
    maxHP: 120,
    hp: 120,
    attacks: {
      'Vine Whip': 7,
      'Razor Leaf': 14,
    },
    name: 'Ivysaur',
    image: 5,
  },
  {
    maxHP: 120,
    hp: 120,
    attacks: {
      Sing: -1,
      Pound: 7,
    },
    name: 'Jigglypuff',
    image: 6,
  },
  {
    maxHP: 200,
    hp: 200,
    attacks: {
      Psychic: 7,
      'Double Team': -1,
    },
    name: 'Mewtwo',
    image: 7,
  },
  {
    maxHP: 120,
    hp: 120,
    attacks: {
      'Rock Throw': 7,
      Harden: -1,
    },
    name: 'Onix',
    image: 8,
  },
  {
    maxHP: 120,
    hp: 120,
    attacks: {
      'Wing Attack': 7,
      Fly: 14,
    },
    name: 'Pidgeot',
    image: 9,
  },
  {
    maxHP: 120,
    hp: 120,
    attacks: {
      Rest: -1,
      'Hyper Beam': 7,
    },
    name: 'Snorlax',
    image: 10,
  }],
  gameWorld: 0,
  opponentWeakArm: 0,
  selfWeakArm: 0,
  fightInfo: 'Getting ready!',
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
  opponent: {
    maxHP: 80,
    hp: 80,
    attacks: {
      'Thunder Shock': 7,
      'Thunder Wave': -1,
    },
    name: 'Pikachu',
  },
  player: {
    maxHP: 256,
    hp: 256,
    attacks: {
      Tackle: 7,
      Growl: -1,
    },
    name: 'Eevee',
  },
  activePoke: 0,
  yourPokes: [
    {
      maxHP: 256,
      hp: 256,
      attacks: {
        Tackle: 7,
        Growl: -1,
        //'Body Slam': 14,
      },
      name: 'Eevee',
      image: 11,
    },
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
