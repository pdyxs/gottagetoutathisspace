import React from 'react';
import Intro from './Intro';
import Materials from './Materials';
// import Timeline from '../post/Timeline';
import Ship from './Ship';
import { baseUrl as trainingUrl } from '../game-fuel';
// import TrainingIntro from './Training';

import InstructionFlow,
  { InstructionPagesInfo }
  from '../../components/InstructionFlow';
import { PlayPhase } from 'model/Phases';

export const baseUrl = '/continue';
const materialsName = 'materials';
export const materialsURL = `${baseUrl}/${materialsName}`;

const pages : InstructionPagesInfo = [
  {
    url: 'intro',
    phase: PlayPhase.Introduction,
    component: Intro
  },
  {
    url: materialsName,
    phase: PlayPhase.Setup,
    component: Materials
  },
  // {
  //   url: 'history',
  //   phase: PlayPhase.Setup,
  //   component: Timeline,
  //   extraProps: {
  //     buttonText: "Well let's continue it then!"
  //   }
  // },
  {
    url: 'ship',
    phase: PlayPhase.Setup,
    component: Ship
  // },
  // {
  //   url: 'trainingIntro',
  //   requiresShipCode: true,
  //   component: TrainingIntro
  }
]

const Continue: React.FC[] =
  InstructionFlow({
    pages, baseUrl, nextUrl: trainingUrl
  });

export default Continue;
