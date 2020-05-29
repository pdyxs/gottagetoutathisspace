import React from 'react';

import InstructionFlow,
  { InstructionPagesInfo }
  from 'components/InstructionFlow';
import Map from './play/Map';
import MapSetup from './play/MapSetup';
import Game from './play/Game';

import { baseUrl as nextURL } from './game-survivor';

import StoryContent from 'content/Game-Upgrade/Story.md';

import level from 'data/levels/level01';

import SetupInstructions from 'content/Game-Upgrade/MapSetup.md';
import GameInstructions from 'content/Game-Upgrade/ScenarioInstructions.md';

import WinContent from 'content/Game-Upgrade/Win.md';
import LoseContent from 'content/Game-Upgrade/Lose.md';
import { PlayPhase } from 'model/Phases';

export const baseUrl = '/game/b';
const setup = 'setup';
export const gameUrl = `${baseUrl}/${setup}`;

const flow : InstructionPagesInfo = [
  {
    url: 'map',
    phase: PlayPhase.GameBStart,
    component: Map,
    className: 'map-upgrade',
    extraProps: {
      story: StoryContent,
      header: `## It's dangerous to run alone...`
    }
  },
  {
    url: setup,
    phase: PlayPhase.GameB,
    component: MapSetup,
    extraProps: {
      level: level,
      instructions: SetupInstructions
    }
  },
  {
    url: 'play',
    phase: PlayPhase.GameB,
    component: Game,
    extraProps: {
      level: level,
      instructions: GameInstructions,
      win: WinContent,
      lose: LoseContent
    }
  }
];

const GameFlow: React.FC = () => {
  return (
    <InstructionFlow pages={flow} baseUrl={baseUrl} nextUrl={nextURL} />
  );
};

export default GameFlow;
