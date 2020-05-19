import { cloneDeep, find, isNil, isArray, without } from "lodash";

export interface GameCellContent {
  type: CellContentTypes,
  subtype?: PlanetTypes | StarTypes,
  count?: number,
  variety?: number
}

export interface GameCellSettings {
  type: CellTypes,
  contents?: Array<GameCellContent>
}

export interface Coords extends Array<number> {}

export const Directions : { [id: string] : Coords; } = {
  Left: [-1,0],
  Right: [1,0],
  Up: [0,-1],
  Down: [0,1],

  UpLeft: [-1,-1],
  UpRight: [1,-1],
  DownLeft: [-1,1],
  DownRight: [1,1]
};

export enum CellTypes {
  Space = 'space',
  Blank = 'blank'
}

export enum CellContentTypes {
  Player = 'playerShip',
  Robot = 'enemy',
  Planet = 'planet',
  Fuel = 'fuel',
  Star = 'star',
  RobotFactory = 'robotFactory',
  Crew = 'crew',
  Upgrade = 'upgrade',
  Module = 'module',
  SpaceStation = 'spaceStation'
}

export enum StarTypes {
  BlueGiant = 'blue',
  Yellow = 'yellow',
  RedDwarf = 'red',
  BlackHole = 'blackHole'
}

export enum PlanetTypes {
  GasGiant = 'gas',
  Rocky = 'rocky'
}

class LevelGrid extends Array<Array<GameCellSettings>> {}

class Level {
  grid: LevelGrid;

  originalGrid: LevelGrid;

  currentShipLocation: Coordinates | undefined;

  constructor(grid: LevelGrid) {
    this.originalGrid = grid;
    this.grid = cloneDeep(grid);
  }

  reset() {
    this.grid = cloneDeep(this.originalGrid);
  }

  coordsAreValid(coordinates: Coords) : boolean {
    if (coordinates[1] < 0 || coordinates[1] >= this.grid.length ||
      coordinates[0] < 0 || coordinates[0] >= this.grid[0].length)
      return false;
    return true;
  }

  cellIsInGrid(coordinates: Coords | GameCellSettings) : boolean {
    return this.getCell(coordinates)?.type !== CellTypes.Blank;
  }

  getCell(where: Coords | GameCellSettings) : GameCellSettings | undefined {
    if (isArray(where)) {
      let coords = where as Coords;
      if (!this.coordsAreValid(coords))
        return undefined;
      return this.grid[coords[1]][coords[0]];
    }
    return where;
  }

  getAt(where: Coords | GameCellSettings, type: CellContentTypes) : GameCellContent | undefined {
    let cell = this.getCell(where);
    return find(cell?.contents, (c : GameCellContent) => c.type === type);
  }

  isShipAt(coordinates: Coords) {
    return !isNil(this.getAt(coordinates, CellContentTypes.Player));
  }

  canMove(from: Coords, by: Coords) : boolean {
    let to: Coords = [from[0] + by[0], from[1] + by[1]];
    if (!this.cellIsInGrid(to))
      return false;

    let oldCell = this.getCell(from);
    let newCell = this.getCell(to);

    return !isNil(oldCell) && !isNil(newCell);
  }

  moveShip(from: Coords, by: Coords) {
    if (this.canMove(from, by) && this.isShipAt(from)) {
      let to: Coords = [from[0] + by[0], from[1] + by[1]];

      let oldCell = this.getCell(from);
      let newCell = this.getCell(to);

      let ship = this.getAt(from, CellContentTypes.Player);

      if (oldCell && newCell && ship) {
        oldCell.contents = filterUndef(without(oldCell.contents, ship));

        newCell.contents = newCell.contents ? [
          ...newCell.contents,
          ship
        ] : [ship];
      }
    }
  }

  hasAtLeast(where: Coords | GameCellSettings, contentType: CellContentTypes, target: number) : boolean {
    let content = this.getAt(where, contentType);
    return ((content?.count || 0) >= target) || false;
  }

  hasAtLeastOneOf(where: Coords | GameCellSettings, contentType: CellContentTypes) : boolean {
    return this.hasAtLeast(where, contentType, 1);
  }

  changeCount(where: Coords | GameCellSettings, contentType: CellContentTypes, delta: number) : boolean {
    let cell = this.getCell(where);
    if (!cell || !this.cellIsInGrid(cell)) return false;

    let content = this.getAt(cell, contentType);
    if (!content) {
      if (delta > 0)
      {
        content = { type: contentType, count: delta };
        cell.contents = [
          ...cell.contents || [],
          content
        ];
        return true;
      }
      return false;
    }
    content.count = Math.max(0, (content.count || 0) + delta);
    return true;
  }

  findClosestOrthogonal(from: Coords, contentType: CellContentTypes) : Coords | null {
    for (let i = 1; i !== this.grid.length; ++i) {
      let availableCoords: Array<Coords> = [
        [from[0] - i, from[1]], //left
        [from[0], from[1] - i], //up
        [from[0] + i, from[1]], //right
        [from[0], from[1] + i], //down
      ];

      for (let j = 0; j !== availableCoords.length; ++j) {
        let coords = availableCoords[j];
        if (!this.cellIsInGrid(coords)) continue;
        var content = this.getAt(coords, contentType);
        if (!isNil(content) && content.count !== 0) {
          return [coords[0] - from[0], coords[1] - from[1]];
        }
      }
    }
    return null;
  }

  updateRobots() {
    let toGrow : Array<Coords> = [];
    let robotCells : Array<Coords> = [];

    let toAdd : Array<Coords> = [];
    //Step 1: move towards players, keep track of robots that need to grow
    for (let yCoord = 0; yCoord !== this.grid.length; ++yCoord) {
      for (let xCoord = 0; xCoord !== this.grid[yCoord].length; ++xCoord) {
        let coord : Coords = [xCoord, yCoord];
        if (!this.hasAtLeastOneOf(coord, CellContentTypes.Robot)) {
          continue;
        }
        robotCells.push(coord);
        let playerDir = this.findClosestOrthogonal(coord, CellContentTypes.Player);
        if (isNil(playerDir)) {
          toGrow.push(coord);
          continue;
        }

        //move 1 robot towards player
        let newCoord : Coords = [
          xCoord + clamp(playerDir[0], -1, 1),
          yCoord + clamp(playerDir[1], -1, 1)
        ];
        this.changeCount(coord, CellContentTypes.Robot, -1);
        toAdd.push(newCoord);
      }
    }
    //Add the robots from movement
    for (let i = 0; i !== toAdd.length; ++i) {
      var addCoord = toAdd[i];
      if (!this.hasAtLeastOneOf(addCoord, CellContentTypes.Robot)) {
        robotCells.push(addCoord);
      }
      this.changeCount(addCoord, CellContentTypes.Robot, 1);
    }

    //Step 2: Grow robots
    for (let i = 0; i !== toGrow.length; ++i) {
      this.changeCount(toGrow[i], CellContentTypes.Robot, 1);
    }

    //Step 3: explode robots
    let cellsToCheck = robotCells;
    while (cellsToCheck.length > 0) {
      let newCellsToCheck: Array<Coords> = [];

      for (let i = 0; i !== cellsToCheck.length; ++i) {
        var coord = cellsToCheck[i];
        if (this.hasAtLeast(coord, CellContentTypes.Robot, 4)) {
          this.changeCount(coord, CellContentTypes.Robot, -4);

          var newRobotCoords = [
            [coord[0] - 1, coord[1]],
            [coord[0] + 1, coord[1]],
            [coord[0], coord[1] - 1],
            [coord[0], coord[1] + 1]
          ];
          for (var j = 0; j !== newRobotCoords.length; ++j) {
            if (this.changeCount(newRobotCoords[j], CellContentTypes.Robot, +1)) {
              newCellsToCheck.push(newRobotCoords[j]);
            }
          }
        }
      }
      cellsToCheck = newCellsToCheck;
    }
  }
}

export function clamp(input: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, input));
}

export function filterUndef<T>(ts: (T | undefined)[]): T[] {
  return ts.filter((t: T | undefined): t is T => !!t)
}

export default Level;
