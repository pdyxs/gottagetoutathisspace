import {
  SET_SHIP_DATA,
  SET_PLAYER_COUNT
} from "./actions";
import { clamp } from "lodash";

export default function reducer(
  state:any = {},
  {type, payload} : {type: string, payload: any}
) : any {
  switch (type) {
    case SET_SHIP_DATA:
      return {
        ...state,
        shipCode: payload.code || null,
        shipData: payload.data || state.shipData
      };
    case SET_PLAYER_COUNT:
      return {
        ...state,
        playerCount: clamp(payload.count, 1, 4)
      }
  }
  return state;
}
