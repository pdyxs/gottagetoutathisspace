import React, { useState } from 'react';
import './GameGrid.css';
import { IonGrid, IonRow } from '@ionic/react';
import GameCell from './GameCell';
import Level, { GameCellSettings } from './Level';

import levels from './levels';

interface GameGridProps { }

const grid = levels[0];

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
