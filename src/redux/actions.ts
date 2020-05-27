export const SET_SHIP_DATA = 'SET_SHIP_DATA';
export const SET_PLAYER_COUNT = 'SET_PLAYER_COUNT';

export const setShipData = (code: string, data: ShipData) => {
  return { type: SET_SHIP_DATA, payload: {code, data} };
}

export const setPlayerCount = (count: number) => {
  return { type: SET_PLAYER_COUNT, payload: {count} };
}

export const clearShipData = () => {
  return { type: SET_SHIP_DATA, payload: {} };
}

export interface HistoryData {
  nextCodeName: string,
  robotsAtEnd: number
}

export interface SystemData {
  systemName: string
}

export interface ShipData {
  shipName: string
}

export const DefaultShipData : ShipData = {
  shipName: ''
}
