import React from 'react';
import Intro from './Intro';
import Materials from './Materials';
import History from './History';

import InstructionFlow,
  { InstructionPagesInfo }
  from '../../components/InstructionFlow';

const baseUrl = '/continue';

const flow : InstructionPagesInfo = [
  {
    url: 'intro',
    requiresShipCode: false,
    component: Intro
  },
  {
    url: 'history',
    requiresShipCode: true,
    component: History
  },
  {
    url: 'materials',
    requiresShipCode: true,
    component: Materials
  }
]

const Continue: React.FC = () => {

  return (
    <InstructionFlow pages={flow} baseUrl={baseUrl} />
  );
};

export default Continue;
