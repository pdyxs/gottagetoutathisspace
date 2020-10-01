import { StateData } from "redux/reducer";

export enum PlayPhase {
  Introduction = "Introduction",
  Setup = "Setup",
  GameAStart = "GameAStart",
  GameA = "GameA",
  GameBStart = "GameBStart",
  GameB = "GameB",
  GameCStart = "GameCStart",
  GameC = "GameC",
  PostGame = "PostGame",
  Checkup = "Checkup"
}

export function isAllowedIn(phase: PlayPhase, data: StateData) {
  return allowedPhases(data).includes(phase);
}

export function allowedPhases(data: StateData) : PlayPhase[] {
  //If no code or data
  if (!data.shipData || !data.shipCode || data.shipData.games.length < 1) {
    return [
      PlayPhase.Introduction
    ];
  }

  //If it's an older player
  if (!data.isCurrentPlayer) {
    return [
      PlayPhase.Checkup
    ]
  }

  let game = data.shipData.games[data.shipData.games.length - 1];
  if (!game.systems || game.systems.length === 0) {
    return [
      PlayPhase.Setup,
      PlayPhase.GameAStart
    ]
  }

  if (game.systems.length === 1) {
    if (!game.systems[0].finished) {
      return [
        PlayPhase.GameA
      ];
    } else if (game.systems[0].won) {
      return [
        PlayPhase.GameBStart
      ];
    } else {
      return [
        PlayPhase.Checkup
      ];
    }
  }

  if (game.systems.length === 2) {
    if (!game.systems[1].finished) {
      return [
        PlayPhase.GameB
      ];
    } else if (game.systems[1].won) {
      return [
        PlayPhase.GameCStart
      ];
    } else {
      return [
        PlayPhase.Checkup
      ];
    }
  }

  if (!game.systems[2].finished) {
    return [
      PlayPhase.GameC
    ];
  } else if (game.systems[2].won) {
    return [
      PlayPhase.PostGame
    ];
  } else {
    return [
      PlayPhase.Checkup
    ];
  }
}

export interface ShipData {
  shipName: string,
  levelOffset?: number,
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
  finished?: boolean,
  won?: boolean
}

export const DefaultShipData : ShipData = {
  shipName: '',
  created: new Date(),
  games: []
}
