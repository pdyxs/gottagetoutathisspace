import React, { useState } from 'react';
import './GameCellContents.css';
import { IonCol, IonPopover, IonButton } from '@ionic/react';

interface GameCellSettings {
  type: string,
  contents?: Object
}

interface GameCellContentsProps {
  settings: GameCellSettings
}

const GameCellContents: React.FC<GameCellContentsProps> = (props) => {
  const {settings: {type}} = props;

  return (
      <div className={`game-cell ${type}`}>

      </div>
  );
};

export default GameCellContents;
