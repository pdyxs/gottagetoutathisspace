export interface GameCellContents {
  type: string,
  subtype?: string,
  count?: number
}

export interface GameCellSettings {
  type: string,
  contents?: Array<GameCellContents>
}

interface Level extends Array<Array<GameCellSettings>> {};

export default Level;
