import React, { useState } from 'react';
import './GameCell.css';
import { IonCol, IonPopover } from '@ionic/react';
import GameCellContents from './GameCellContents';
import Level, { GameCellSettings, Coords } from '../../model/Level';
import GameCellPopover from './GameCellPopover';

interface GameCellProps {
  coordinates: Coords,
  level: Level,
  settings: GameCellSettings,
  refresh: CallableFunction,
  includeControls: boolean
}

const GameCell: React.FC<GameCellProps> = (props) => {
  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState(new Event(""));
  const {coordinates, level, refresh} = props;
  let popover = React.useRef<HTMLIonPopoverElement>(null);

  var newProps = {
    ...props,
    refresh: function(dismissPopover: boolean = true) {
      if (dismissPopover) {
        popover.current?.dismiss();
      }
      refresh();
    }
  }

  return (
      <IonCol size="auto" className="game-cell-container"
        onClick={level.cellIsInGrid(coordinates) ?
          e => {
            setShowPopover(true);
            setPopoverEvent(e.nativeEvent)
          } : undefined}>

        <GameCellContents {...newProps} />
        <IonPopover
            ref={popover}
            isOpen={showPopover}
            event={popoverEvent}
            onDidDismiss={() => setShowPopover(false)}
          >
          <div className={`game-cell-container overlay`}>
            <GameCellContents {...newProps} />
          </div>
          <div className="game-cell-popover">
            <GameCellPopover {...newProps} />
          </div>
        </IonPopover>
      </IonCol>
  );
};

export default GameCell;
