import {
  SET_PLAY_DATA,
  SET_PLAYER_COUNT,
  SET_LOADING,
  SET_CODENAME
} from "./actions";
import { clamp } from "lodash";
import { ShipData } from "model/Phases";

export interface StateData {
  shipCode?: string,
  codeName?: string,
  shipData?: ShipData,
  isCurrentPlayer?: boolean,
  playerCount?: number,
  isLoading?: boolean
}

export default function reducer(
  state:StateData = {},
  {type, payload} : {type: string, payload: any}
) : StateData {
  switch (type) {
    case SET_PLAY_DATA:
      return {
        ...state,
        shipCode: payload.shipCode || null,
        shipData: payload.ship || state.shipData,
        isCurrentPlayer: payload.isCurrentPlayer
      };
    case SET_PLAYER_COUNT:
      return {
        ...state,
        playerCount: clamp(payload.count, 1, 4)
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: payload.isLoading
      };
    case SET_CODENAME:
      return {
        ...state,
        codeName: payload.codename
      };
  }
  return state;
}
