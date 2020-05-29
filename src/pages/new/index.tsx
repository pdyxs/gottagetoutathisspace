import React from 'react';
import Intro from './Intro';
import MakeGame from './MakeGame';
import Ship from './Ship';
import { baseUrl as trainingUrl } from '../game-fuel';

import InstructionFlow,
  { InstructionPagesInfo }
  from '../../components/InstructionFlow';
import { PlayPhase } from 'model/Phases';

const flow : InstructionPagesInfo = [
  {
    url: 'intro',
    phase: PlayPhase.Introduction,
    component: Intro
  },
  {
    url: 'make',
    phase: PlayPhase.Introduction,
    component: MakeGame
  },
  {
    url: 'assembleShip',
    phase: PlayPhase.Introduction,
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
