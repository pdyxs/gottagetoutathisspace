export const SET_SHIP_DATA = 'SET_SHIP_DATA';

export const setShipData = (code: string, data: ShipData) => {
  return { type: SET_SHIP_DATA, payload: {code, data} };
}

export const clearShipData = () => {
  return { type: SET_SHIP_DATA, payload: {} };
}

export interface LevelData {
  playerName: string,
  fuelAtEnd: number
}

export interface ShipData {
  shipName: string,

  levelsComplete: number,
  robotTokens: string,
  shipToken: string,
  survivorToken: string,
  upgradeToken: string,
  newModuleToken: string,
  fuelTokens: string,

  shipCards: string,
  spaceCards: string,
  crewCards: string,

  levels: Array<LevelData>
}

export const DefaultShipData : ShipData = {
  shipName: '',

  levelsComplete: 0,

  robotTokens: '',
  shipToken: '',
  survivorToken: '',
  upgradeToken: '',
  newModuleToken: '',
  fuelTokens: '',

  shipCards: '',
  spaceCards: '',
  crewCards: '',

  levels: []
}
