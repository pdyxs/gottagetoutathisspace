import Level, { Coords, GameCellSettings, Directions, CellContentTypes } from "../../model/Level";
import { IonButton, IonIcon } from "@ionic/react";
import React from "react";
import { chevronUp, add, remove } from "ionicons/icons";
import './GameCellPopover.scss';

interface GameCellPopoverProps {
  coordinates: Coords,
  level: Level,
  settings: GameCellSettings,
  refresh: CallableFunction,
  includeControls: boolean
}

interface MoveButtonProps {
  coordinates: Coords,
  level: Level,
  settings: GameCellSettings,
  refresh: CallableFunction,
  direction: Coords,
  iconAngle: number
}

const MoveButton: React.FC<MoveButtonProps> = ({coordinates, iconAngle, level, direction, refresh}) => {
  function moveShip() {
    level.moveShip(coordinates, direction);
    refresh();
  }

  return (
    <IonButton className="ion-no-padding"
      disabled={!level.canMove(coordinates, direction)}
      onClick={() => moveShip()}>
      <IonIcon icon={chevronUp} style={{transform: `rotate(${iconAngle}deg)`}} />
    </IonButton>
  )
}

const GameCellPopover: React.FC<GameCellPopoverProps> = (props) => {
  const {level, coordinates} = props;

  function changeCount(contentType: CellContentTypes, delta: number) {
    level.changeCount(coordinates, contentType, delta);
  }

  return (
    <div className="popover">
      { level.isShipAt(coordinates) &&
        <div className="section">
          <h6>Move Ship</h6>
          <div>
            <MoveButton {...props} iconAngle={-45} direction={Directions.UpLeft} />
            <MoveButton {...props} iconAngle={0} direction={Directions.Up} />
            <MoveButton {...props} iconAngle={45} direction={Directions.UpRight} />
          </div>
          <div>
            <MoveButton {...props} iconAngle={-90} direction={Directions.Left} />
            <IonButton className="ion-no-padding" style={{opacity: 0}} disabled>
              <IonIcon icon={chevronUp} />
            </IonButton>
            <MoveButton {...props} iconAngle={95} direction={Directions.Right} />
          </div>
          <div>
            <MoveButton {...props} iconAngle={-135} direction={Directions.DownLeft} />
            <MoveButton {...props} iconAngle={180} direction={Directions.Down} />
            <MoveButton {...props} iconAngle={135} direction={Directions.DownRight} />
          </div>
        </div>
      }
      <div className="section">
        <h6>Robots</h6>
        <div>
          <IonButton className="ion-no-padding"
            disabled={!level.hasAtLeastOneOf(coordinates, CellContentTypes.Robot)}
            onClick={() => changeCount(CellContentTypes.Robot, -1)}>
            <IonIcon icon={remove} />
          </IonButton>
          <IonButton className="ion-no-padding"
            onClick={() => changeCount(CellContentTypes.Robot, 1)}>
            <IonIcon icon={add} />
          </IonButton>
        </div>
      </div>
    </div>
  );
};

export default GameCellPopover;
