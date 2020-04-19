import React, { useState } from 'react';
import './GameCell.css';
import { IonCol, IonPopover, IonButton } from '@ionic/react';
import GameCellContents from './GameCellContents';
import { GameCellSettings } from './Level';

interface GameCellProps {
  settings: GameCellSettings
}

const GameCell: React.FC<GameCellProps> = (props) => {
  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState(new Event(""));
  const {settings: {type}} = props;

  return (
      <IonCol size="auto" className="game-cell-container"
        onClick={type == "blank" ? undefined :
          e => {
            setShowPopover(true);
            setPopoverEvent(e.nativeEvent)
          }}>

        <GameCellContents settings={props.settings} />
        <IonPopover
            isOpen={showPopover}
            event={popoverEvent}
            onDidDismiss={e => setShowPopover(false)}
          >
          <div className={`game-cell-container overlay`}>
            <GameCellContents settings={props.settings} />
          </div>
          <div className="game-cell-popover">
            <p>This is popover content</p>
          </div>
        </IonPopover>
      </IonCol>
  );
};

export default GameCell;
