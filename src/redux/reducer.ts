import {
  SET_PLAY_DATA,
  SET_PLAYER_COUNT
} from "./actions";
import { clamp } from "lodash";

export default function reducer(
  state:any = {},
  {type, payload} : {type: string, payload: any}
) : any {
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
      }
  }
  return state;
}
