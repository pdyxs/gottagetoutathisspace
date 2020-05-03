import React from 'react';

import InstructionFlow,
  { InstructionPagesInfo }
  from '../../components/InstructionFlow';
import MapSetup from './MapSetup';
import Game from './Game';

const flow : InstructionPagesInfo = [
  {
    url: 'mapSetup',
    requiresShipCode: true,
    component: MapSetup
  },
  {
    url: 'play',
    requiresShipCode: true,
    component: Game
  }
]

export const baseUrl = '/training';

const Training: React.FC = () => {
  return (
    <InstructionFlow pages={flow} baseUrl={baseUrl} />
  );
};

export default Training;
