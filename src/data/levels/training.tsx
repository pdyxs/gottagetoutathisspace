import Level, { CellContentTypes, CellTypes, PlanetTypes, StarTypes } from 'model/Level';

const grid = new Level([
  [
    {
      type: CellTypes.Space,
      contents: [
        { type: CellContentTypes.Player }
      ]
    },
    { type: CellTypes.Space },
    { type: CellTypes.Space },
    { type: CellTypes.Space }
  ],
  [
    { type: CellTypes.Space },
    {
      type: CellTypes.Space,
      contents: [
        { type: CellContentTypes.Planet, subtype: PlanetTypes.GasGiant, variety: 2 },
        { type: CellContentTypes.Fuel, count: 2 }
      ]
    },
    { type: CellTypes.Space },
    { type: CellTypes.Space }
  ],
  [
    { type: CellTypes.Space },
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
    {
      type: CellTypes.Space,
      contents: [
        { type: CellContentTypes.Robot, count: 1 }
      ]
    },
    { type: CellTypes.Space },
    {
      type: CellTypes.Space,
      contents: [
        { type: CellContentTypes.Star, subtype: StarTypes.BlueGiant }
      ]
    },
  ]
]);

export default grid;
