import React from 'react';
import './GameGrid.css';
import { IonGrid, IonRow } from '@ionic/react';
import GameCell from './GameCell';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Level from '../../model/Level';

library.add(fas)

interface GameGridProps {
  level: Level
}

const GameGrid: React.FC<GameGridProps> = ({level}) => {
  return (
    <IonGrid className={`game-grid game-grid-${level[0].length}`}>
      { level.map(((row, i) => (
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
