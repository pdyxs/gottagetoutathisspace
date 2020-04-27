import React, { useState, Fragment } from 'react';
import './GameGrid.css';
import { IonGrid, IonRow } from '@ionic/react';
import GameCell from './GameCell';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Level from '../../model/Level';
import GameControls from './GameControls';

library.add(fas)

interface GameGridProps {
  level: Level,
  includeControls?: boolean
}

const GameGrid: React.FC<GameGridProps> = ({level, includeControls}) => {
  const [refreshCount, setRefresh] = useState(0);

  function refresh() {
    setRefresh(refreshCount + 1);
  }

  let gameProps = {
    refresh: refresh,
    level: level
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
      <GameControls {...gameProps} />
    </Fragment>
  );
};

export default GameGrid;
