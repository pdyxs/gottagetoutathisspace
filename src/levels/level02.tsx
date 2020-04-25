import Level from "../model/Level";

const grid : Level = [
  [
    { type: 'blank' },
    { type: 'blank' },
    {
      type: 'space',
      contents: [
        { type: "startPosition" }
      ]
    },
    { type: 'blank' },
    { type: 'blank' }
  ],
  [
    { type: 'blank' },
    { type: 'space' },
    { type: 'space' },
    { type: 'space' },
    { type: 'blank' }
  ],
  [
    { type: 'space' },
    {
      type: 'space',
      contents: [
        { type: 'planet', subtype:'rocky' },
        { type: 'fuel', count: 1 },
        { type: 'upgrade' }
      ]
    },
    { type: 'space' },
    { type: 'space' },
    { type: 'space' }
  ],
  [
    {
      type: 'space',
      contents: [
        { type: 'enemy', count: 1 }
      ]
    },
    { type: 'space' },
    {
      type: 'space',
      contents: [
        { type: 'star', subtype: 'yellow' }
      ]
    },
    { type: 'space' },
    {
      type: 'space',
      contents: [
        { type: 'planet', subtype: 'gas' },
        { type: 'fuel', count: 3 }
      ]
    }
  ],
  [
    { type: 'blank' },
    { type: 'blank' },
    {
      type: 'space',
      contents: [
        { type: 'planet', subtype: 'rocky' },
        { type: 'fuel', count: 1 },
        { type: 'crew' }
      ]
    },
    { type: 'blank' },
    { type: 'blank' }
  ],
  [
    { type: 'blank' },
    { type: 'blank' },
    {
      type: 'space',
      contents: [
        { type: 'enemy', count: 1 }
      ]
    },
    { type: 'blank' },
    { type: 'blank' }
  ]
];

export default grid;
