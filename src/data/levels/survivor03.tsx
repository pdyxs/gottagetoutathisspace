import Level, { PlanetTypes, CellContentTypes, CellTypes, StarTypes } from 'model/Level';

const grid = new Level([
  [
    {
      type: CellTypes.Space,
      contents: [
        { type: CellContentTypes.SpaceStation },
        { type: CellContentTypes.Crew, variety: 1 }
      ]
    },
    {
      type: CellTypes.Space,
      contents: [
        { type: CellContentTypes.Planet, subtype:PlanetTypes.GasGiant, variety: 1 },
        { type: CellContentTypes.Fuel, count: 2 }
      ]
    },
    {
      type: CellTypes.Space,
      contents: [
        { type: CellContentTypes.RobotFactory },
        { type: CellContentTypes.Robot, count: 1 }
      ]
    },
    { type: CellTypes.Space }
  ],
  [
    {
      type: CellTypes.Space,
      contents: [
        { type: CellContentTypes.Star, subtype: StarTypes.RedDwarf }
      ]
    },
    { type: CellTypes.Blank },
    {
      type: CellTypes.Space,
      contents: [
        { type: CellContentTypes.AsteroidField }
      ]
    },
    {
      type: CellTypes.Space,
      contents: [
        { type: CellContentTypes.Planet, subtype:PlanetTypes.GasGiant, variety: 2 },
        { type: CellContentTypes.Fuel, count: 3 }
      ]
    }
  ],
  [
    {
      type: CellTypes.Space,
      contents: [
        { type: CellContentTypes.RobotFactory },
        { type: CellContentTypes.Robot, count: 1 }
      ]
    },
    {
      type: CellTypes.Space,
      contents: [
        { type: CellContentTypes.AsteroidField }
      ]
    },
    {
      type: CellTypes.Space,
      contents: [
        { type: CellContentTypes.Planet, subtype: PlanetTypes.Rocky, variety: 1 },
        { type: CellContentTypes.Module }
      ]
    },
    { type: CellTypes.Space }
  ],
  [
    { type: CellTypes.Space },
    { type: CellTypes.Space },
    { type: CellTypes.Space },
    {
      type: CellTypes.Space,
      contents: [
        { type: CellContentTypes.Player }
      ]
    }
  ],
  [
    {
      type: CellTypes.Space,
      contents: [
        { type: CellContentTypes.SpaceStation },
        { type: CellContentTypes.Upgrade },
        { type: CellContentTypes.Crew, variety: 1 }
      ]
    },
    { type: CellTypes.Blank },
    { type: CellTypes.Blank },
    { type: CellTypes.Blank }
  ]
], StarTypes.RedDwarf);

export default grid;
