import React from 'react';

import InstructionFlow,
  { InstructionPagesInfo }
  from '../../components/InstructionFlow';

import LossIntro from './LossIntro';
import { PlayPhase } from 'model/Phases';

import { baseUrl as postUrl } from 'pages/post/index';

export const baseUrl = '/loss';

const pages : InstructionPagesInfo = [
  {
    url: 'intro',
    phase: PlayPhase.Checkup,
    component: LossIntro
  }
];

const PostGame: React.FC[] =
  InstructionFlow({
    pages, baseUrl, nextUrl: postUrl
  });

export default PostGame;
