export const SET_PLAY_DATA = 'SET_PLAY_DATA';
export const SET_PLAYER_COUNT = 'SET_PLAYER_COUNT';

export const setPlayData = (data: ReturnData) => {
  return { type: SET_PLAY_DATA, payload: {...data} };
}

export const setPlayerCount = (count: number) => {
  return { type: SET_PLAYER_COUNT, payload: {count} };
}

export const clearPlayData = () => {
  return { type: SET_PLAY_DATA, payload: {} };
}

export interface ShipData {
  shipName: string,
  created: Date,
  games: GameData[]
}

export interface ReturnData {
  shipCode: string,
  ship: ShipData,
  isCurrentPlayer: boolean
}

export interface GameData {
  created: Date,
  codeName?: string,
  systems: SystemData[],
  finalShipURL?: string
}

export interface SystemData {
  created: Date,
  name?: string,
  won?: boolean
}

export const DefaultShipData : ShipData = {
  shipName: '',
  created: new Date(),
  games: []
}
