import React, { useState, Fragment } from 'react';
import './GameGrid.css';
import { IonGrid, IonRow } from '@ionic/react';
import GameCell from './GameCell';
import Level from '../../model/Level';
import GameControls from './GameControls';

interface GameGridProps {
  level: Level,
  includeControls?: boolean,
  winLevel?: () => void,
  loseLevel?: () => void
}

const GameGrid: React.FC<GameGridProps> = ({level, includeControls, winLevel, loseLevel}) => {
  const [refreshCount, setRefresh] = useState(0);

  function refresh() {
    setRefresh(refreshCount + 1);
  }

  let gameProps = {
    refresh,
    level,
    winLevel,
    loseLevel
  }

  return (
    <Fragment>
      <IonGrid className={`game-grid game-grid-${level.grid[0].length}`}>
        { level.grid.map(((row, i) => (
          <IonRow key={i} className="game-row">
            {row.map((cell, j) => (
              <GameCell key={j}
                includeControls={includeControls || false}
                settings={cell} coordinates={[j,i]}
                {...gameProps} />
            ))}
          </IonRow>
        ))) }
      </IonGrid>
      {includeControls &&
        <GameControls {...gameProps} />
      }
    </Fragment>
  );
};

export default GameGrid;
