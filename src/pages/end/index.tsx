import React from 'react';

import InstructionFlow,
  { InstructionPagesInfo }
  from '../../components/InstructionFlow';

import RecordLogs from './RecordLogs';
import SendGame from './SendGame';

export const baseUrl = '/end';

const flow : InstructionPagesInfo = [
  {
    url: 'record',
    requiresShipCode: true,
    component: RecordLogs
  },
  {
    url: 'send',
    requiresShipCode: true,
    component: SendGame
  }
]

const Continue: React.FC = () => {

  return (
    <InstructionFlow pages={flow} baseUrl={baseUrl} nextUrl={'/'} />
  );
};

export default Continue;
