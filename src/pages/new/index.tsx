import React from 'react';
import Intro from './Intro';
import MakeGame from './MakeGame';

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
  }
]

export const baseUrl = '/new';

const NewGame: React.FC = () => {
  return (
    <InstructionFlow pages={flow} baseUrl={baseUrl} />
  );
};

export default NewGame;
