import React from 'react';

import InstructionFlow,
  { InstructionPagesInfo }
  from '../../components/InstructionFlow';

import RecordLogs from './RecordLogs';
import SendGame from './SendGame';
import { PlayPhase } from 'model/Phases';

export const baseUrl = '/end';

const flow : InstructionPagesInfo = [
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

const Continue: React.FC = () => {

  return (
    <InstructionFlow pages={flow} baseUrl={baseUrl} nextUrl={'/'} />
  );
};

export default Continue;
