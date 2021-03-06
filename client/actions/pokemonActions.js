/* eslint-disable import/prefer-default-export */
import * as constants from './constants';

export const damageOnOpponent = (damage) => ({ type: constants.OPPONENT_DAMAGE, payload: damage });
export const drainOnOpponent = (drain) => ({ type: constants.OPPONENT_DRAIN, payload: drain });
export const damageOnPlayer = (damage) => ({ type: constants.PLAYER_DAMAGE, payload: damage });
export const getRandomPokemon = () => ({ type: constants.SET_RANDOM_POKEMON });
export const getRandomSelf = () => ({ type: constants.SET_RANDOM_SELF });
export const infoReset = (info) => ({ type: constants.ATTACK_INFO, payload: info });
export const effectOnPlayer = (effect) => ({ type: constants.EFFECT_ATTACK, payload: effect });
export const itemUse = (details) => ({ type: constants.ITEM_USE, payload: details });
export const throwBall = (details) => ({ type: constants.THROW_BALL, payload: details });
export const moreChangePoke = (iden) => ({ type: constants.CHANGE_POKE, payload: iden });
