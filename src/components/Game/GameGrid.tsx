import React from 'react';
import './GameGrid.css';
import { IonGrid, IonRow } from '@ionic/react';
import GameCell from './GameCell';

import levels from './levels';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

interface GameGridProps { }

const grid = levels[1];

const GameGrid: React.FC<GameGridProps> = () => {
  return (
    <IonGrid className={`game-grid game-grid-${grid[0].length}`}>
      { grid.map(((row, i) => (
        <IonRow key={i} className="game-row">
          {row.map((cell, j) => (
            <GameCell key={j} settings={cell} />
          ))}
        </IonRow>
      ))) }
    </IonGrid>
  );
};

export default GameGrid;
