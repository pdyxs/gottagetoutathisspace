import Space from "model/Space";
import { CellContentTypes, StarTypes, PlanetTypes } from "model/Level";
import { reduce } from "lodash";

const space : Space[] = [
  {
    type: CellContentTypes.Star,
    subtype: StarTypes.BlueGiant,
    count: 1
  },
  {
    type: CellContentTypes.Star,
    subtype: StarTypes.Yellow,
    count: 1
  },
  {
    type: CellContentTypes.Star,
    subtype: StarTypes.RedDwarf,
    count: 1
  },
  {
    type: CellContentTypes.Planet,
    subtype: PlanetTypes.GasGiant,
    count: 1,
    variety: 1
  },
  {
    type: CellContentTypes.Planet,
    subtype: PlanetTypes.GasGiant,
    count: 1,
    variety: 2
  },
  {
    type: CellContentTypes.Planet,
    subtype: PlanetTypes.Rocky,
    count: 1,
    variety: 1
  },
  {
    type: CellContentTypes.Planet,
    subtype: PlanetTypes.Rocky,
    count: 1,
    variety: 2
  },
  {
    type: CellContentTypes.RobotFactory,
    count: 2
  },
  {
    type: CellContentTypes.SpaceStation,
    count: 1
  },
  {
    type: CellContentTypes.Star,
    subtype: StarTypes.BlackHole,
    count: 1
  }
];

const allSpace : Space[]  = [
  ...space,
  {
    count: 16 - reduce(space, (acc, s) => acc + s.count, 0)
  }
];

export default allSpace;
