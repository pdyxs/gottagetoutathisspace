import React from 'react';

import InstructionFlow,
  { InstructionPagesInfo }
  from '../../components/InstructionFlow';
import Map from './Map';
import MapSetup from './MapSetup';
import Game from './Game';
import { baseUrl as gameURL } from '../game';

const flow : InstructionPagesInfo = [
  {
    url: 'map',
    requiresShipCode: true,
    component: Map
  },
  {
    url: 'setup',
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
    <InstructionFlow pages={flow} baseUrl={baseUrl} nextUrl={gameURL} />
  );
};

export default Training;
