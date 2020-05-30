import Level, { PlanetTypes, CellContentTypes, CellTypes, StarTypes } from 'model/Level';

const grid = new Level([
  [
    {
      type: CellTypes.Space,
      contents: [
        { type: CellContentTypes.Planet, subtype: PlanetTypes.GasGiant, variety: 1 },
        { type: CellContentTypes.Fuel, count: 3 }
      ]
    },
    { type: CellTypes.Space },
    {
      type: CellTypes.Space,
      contents: [
        { type: CellContentTypes.Planet, subtype:PlanetTypes.Rocky, variety: 2 },
        { type: CellContentTypes.Module, count: 1 }
      ]
    },
    {
      type: CellTypes.Space,
      contents: [
        { type: CellContentTypes.RobotFactory, count: 1 },
        { type: CellContentTypes.Robot, count: 1 }
      ]
    }
  ],
  [
    { type: CellTypes.Space },
    { type: CellTypes.Space },
    {
      type: CellTypes.Space,
      contents: [
        { type: CellContentTypes.Star, subtype: StarTypes.Yellow }
      ]
    },
    { type: CellTypes.Space }
  ],
  [
    { type: CellTypes.Space },
    { type: CellTypes.Space},
    { type: CellTypes.Space },
    { type: CellTypes.Space }
  ],
  [
    {
      type: CellTypes.Space,
      contents: [
        { type: CellContentTypes.Player }
      ]
    },
    { type: CellTypes.Space },
    { type: CellTypes.Space },
    {
      type: CellTypes.Space,
      contents: [
        { type: CellContentTypes.Planet, subtype: PlanetTypes.Rocky, variety: 1 },
        { type: CellContentTypes.Fuel, count: 2 },
        { type: CellContentTypes.Upgrade }
      ]
    }
  ]
], StarTypes.Yellow);

export default grid;
