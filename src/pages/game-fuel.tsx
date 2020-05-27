import React from 'react';

import InstructionFlow,
  { InstructionPagesInfo }
  from 'components/InstructionFlow';
import Map from './play/Map';
import MapSetup from './play/MapSetup';
import Game from './play/Game';
import { baseUrl as nextURL } from './game-upgrade';

import StoryContent from 'content/Game-Fuel/Story.md';

import trainingLevel from 'data/levels/training';

import SetupInstructions from 'content/Game-Fuel/MapSetup.md';
import GameInstructions from 'content/Game-Fuel/ScenarioInstructions.md';

import WinContent from 'content/Game-Fuel/Win.md';
import LoseContent from 'content/Game-Fuel/Lose.md';

const flow : InstructionPagesInfo = [
  {
    url: 'map',
    requiresShipCode: true,
    component: Map,
    className: 'map-fuel',
    extraProps: {
      story: StoryContent,
      header: `## It's a cold night in the Robot Apocalypse...`
    }
  },
  {
    url: 'setup',
    requiresShipCode: true,
    component: MapSetup,
    extraProps: {
      level: trainingLevel,
      instructions: SetupInstructions
    }
  },
  {
    url: 'play',
    requiresShipCode: true,
    component: Game,
    extraProps: {
      level: trainingLevel,
      instructions: GameInstructions,
      win: WinContent,
      lose: LoseContent
    }
  }
];

export const baseUrl = '/game/a';

const GameFlow: React.FC = () => {
  return (
    <InstructionFlow pages={flow} baseUrl={baseUrl} nextUrl={nextURL} />
  );
};

export default GameFlow;
