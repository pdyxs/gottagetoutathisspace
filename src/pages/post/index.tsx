import React from 'react';

import InstructionFlow,
  { InstructionPagesInfo }
  from '../../components/InstructionFlow';

import Timeline from './Timeline';
import { PlayPhase } from 'model/Phases';

export const baseUrl = '/post';

const pages : InstructionPagesInfo = [
  {
    url: 'timeline',
    phase: PlayPhase.Checkup,
    component: Timeline,
    extraProps: {
      buttonText: 'Return to Homepage' 
    }
  }
];

const PostGame: React.FC[] =
  InstructionFlow({
    pages, baseUrl, nextUrl: '/'
  });

export default PostGame;
