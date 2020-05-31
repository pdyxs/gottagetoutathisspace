import React from 'react';

import InstructionFlow,
  { InstructionPagesInfo }
  from 'components/InstructionFlow';
import Map from './play/Map';
import MapSetup from './play/MapSetup';
import Game from './play/Game';

import { baseUrl as nextURL } from './game-survivor';

import StoryContent from 'content/Game-Upgrade/Story.md';

import SetupInstructions from 'content/Game-Upgrade/MapSetup.md';
import GameInstructions from 'content/Game-Upgrade/ScenarioInstructions.md';

import WinContent from 'content/Game-Upgrade/Win.md';
import LoseContent from 'content/Game-Upgrade/Lose.md';
import { PlayPhase } from 'model/Phases';
import { upgradeLevel } from 'data/levels';

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
      level: (game: number) => upgradeLevel(game),
      instructions: SetupInstructions
    }
  },
  {
    url: 'play',
    phase: PlayPhase.GameB,
    component: Game,
    extraProps: {
      level: (game: number) => upgradeLevel(game),
      instructions: GameInstructions,
      win: WinContent,
      lose: LoseContent
    }
  }
];

const GameFlow: React.FC[] =
  InstructionFlow({
    pages: flow, baseUrl, nextUrl: nextURL
  });

export default GameFlow;
