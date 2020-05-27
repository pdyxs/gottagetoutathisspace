import React from 'react';
import Intro from './Intro';
import Materials from './Materials';
// import History from './History';
import Ship from './Ship';
import { baseUrl as trainingUrl } from '../game-fuel';
// import TrainingIntro from './Training';

import InstructionFlow,
  { InstructionPagesInfo }
  from '../../components/InstructionFlow';

export const baseUrl = '/continue';

const flow : InstructionPagesInfo = [
  {
    url: 'intro',
    requiresShipCode: false,
    component: Intro
  },
  // {
  //   url: 'history',
  //   requiresShipCode: true,
  //   component: History
  // },
  {
    url: 'materials',
    requiresShipCode: true,
    component: Materials
  },
  {
    url: 'assembleShip',
    requiresShipCode: true,
    component: Ship
  // },
  // {
  //   url: 'trainingIntro',
  //   requiresShipCode: true,
  //   component: TrainingIntro
  }
]

const Continue: React.FC = () => {

  return (
    <InstructionFlow pages={flow} baseUrl={baseUrl} nextUrl={trainingUrl} />
  );
};

export default Continue;
