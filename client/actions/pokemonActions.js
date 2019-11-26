/* eslint-disable import/prefer-default-export */
import * as constants from './constants';

export const damageOnOpponent = (damage) => ({ type: constants.OPPONENT_DAMAGE, payload: damage });
export const drainOnOpponent = (drain) => ({ type: constants.OPPONENT_DRAIN, payload: drain });
export const damageOnPlayer = (damage) => ({ type: constants.PLAYER_DAMAGE, payload: damage });
