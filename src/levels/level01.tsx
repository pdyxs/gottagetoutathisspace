import Level from "../model/Level";

const grid : Level = [
  [
    {
      type: 'space',
      contents: [
        { type: 'planet', subtype: 'gas' },
        { type: 'fuel', count: 2 }
      ]
    },
    { type: 'space' },
    { type: 'space' },
    {
      type: 'space',
      contents: [
        { type: "enemy", count: 1 }
      ]
    }
  ],
  [
    { type: 'space' },
    { type: 'space' },
    {
      type: 'space',
      contents: [
        { type: 'star', subtype: 'yellow' }
      ]
    },
    { type: 'space' }
  ],
  [
    { type: 'space' },
    {
      type: 'space',
      contents: [
        { type: 'planet', subtype:'rocky' },
        { type: 'fuel', count: 1 }
      ]
    },
    { type: 'space' },
    { type: 'space' }
  ],
  [
    {
      type: 'space',
      contents: [
        { type: "startPosition" }
      ]
    },
    { type: 'space' },
    { type: 'space' },
    {
      type: 'space',
      contents: [
        { type: 'planet', subtype: 'gas' },
        { type: 'fuel', count: 3 }
      ]
    }
  ]
];

export default grid;
