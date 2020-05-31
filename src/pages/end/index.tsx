import React from 'react';

import InstructionFlow,
  { InstructionPagesInfo }
  from '../../components/InstructionFlow';

import RecordLogs from './RecordLogs';
import SendGame from './SendGame';
import { PlayPhase } from 'model/Phases';

import { baseUrl as postUrl } from 'pages/post/index';

export const baseUrl = '/end';

const pages : InstructionPagesInfo = [
  {
    url: 'record',
    phase: PlayPhase.PostGame,
    component: RecordLogs
  },
  {
    url: 'send',
    phase: PlayPhase.Checkup,
    component: SendGame
  }
]

const EndGame: React.FC[] =
  InstructionFlow({
    pages, baseUrl, nextUrl: postUrl
  });

export default EndGame;
