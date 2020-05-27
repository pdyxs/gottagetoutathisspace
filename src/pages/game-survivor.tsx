import React from 'react';

import InstructionFlow,
  { InstructionPagesInfo }
  from 'components/InstructionFlow';
import Map from './play/Map';
import MapSetup from './play/MapSetup';
import Game from './play/Game';

import StoryContent from 'content/Game-Survivor/Story.md';

import level from 'data/levels/level02';

import SetupInstructions from 'content/Game-Survivor/MapSetup.md';
import GameInstructions from 'content/Game-Survivor/ScenarioInstructions.md';

import WinContent from 'content/Game-Survivor/Win.md';
import LoseContent from 'content/Game-Survivor/Lose.md';

import { baseUrl as nextURL } from './end';

const flow : InstructionPagesInfo = [
  {
    url: 'map',
    requiresShipCode: true,
    component: Map,
    className: 'map-survivor',
    extraProps: {
      story: StoryContent,
      header: `## Time to leave, while you still can`
    }
  },
  {
    url: 'setup',
    requiresShipCode: true,
    component: MapSetup,
    extraProps: {
      level: level,
      instructions: SetupInstructions
    }
  },
  {
    url: 'play',
    requiresShipCode: true,
    component: Game,
    extraProps: {
      level: level,
      instructions: GameInstructions,
      win: WinContent,
      lose: LoseContent
    }
  }
]

export const baseUrl = '/game/c';

const GameFlow: React.FC = () => {
  return (
    <InstructionFlow pages={flow} baseUrl={baseUrl} nextUrl={nextURL} />
  );
};

export default GameFlow;
