import Level, { PlanetTypes, CellContentTypes, CellTypes, StarTypes } from 'model/Level';

const grid = new Level([
  [
    {
      type: CellTypes.Space,
      contents: [
        { type: CellContentTypes.Planet, subtype: PlanetTypes.GasGiant },
        { type: CellContentTypes.Fuel, count: 2 }
      ]
    },
    { type: CellTypes.Space },
    { type: CellTypes.Space },
    {
      type: CellTypes.Space,
      contents: [
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
    {
      type: CellTypes.Space,
      contents: [
        { type: CellContentTypes.Planet, subtype:PlanetTypes.Rocky },
        { type: CellContentTypes.Fuel, count: 1 }
      ]
    },
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
        { type: CellContentTypes.Planet, subtype: PlanetTypes.GasGiant },
        { type: CellContentTypes.Fuel, count: 3 }
      ]
    }
  ]
]);

export default grid;
