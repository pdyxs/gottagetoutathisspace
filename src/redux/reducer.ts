import { SET_SHIP_DATA } from "./actions";

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
  }
  return state;
}
