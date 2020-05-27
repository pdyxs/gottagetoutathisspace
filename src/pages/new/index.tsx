import React from 'react';
import Intro from './Intro';
import MakeGame from './MakeGame';
import Ship from './Ship';
import { baseUrl as trainingUrl } from '../game-fuel';

import InstructionFlow,
  { InstructionPagesInfo }
  from '../../components/InstructionFlow';

const flow : InstructionPagesInfo = [
  {
    url: 'intro',
    requiresShipCode: false,
    component: Intro
  },
  {
    url: 'make',
    requiresShipCode: false,
    component: MakeGame
  },
  {
    url: 'assembleShip',
    requiresShipCode: false,
    component: Ship
  }
];

export const baseUrl = '/new';

const NewGame: React.FC = () => {
  return (
    <InstructionFlow pages={flow} baseUrl={baseUrl} nextUrl={trainingUrl} />
  );
};

export default NewGame;
