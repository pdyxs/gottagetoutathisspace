import Level, { Coords, Directions } from "../../../model/Level";
import React from "react";

import { IonButton, IonIcon } from "@ionic/react";
import { chevronUp } from "ionicons/icons";

import './PlayerControls.scss';
import { ControlProps } from "../Pieces";

interface MoveButtonProps {
  coordinates: Coords,
  level: Level,
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
    <IonButton className="player-move-button ion-no-padding"
      disabled={!level.canMove(coordinates, direction)}
      onClick={() => moveShip()}>
      <IonIcon icon={chevronUp} style={{transform: `rotate(${iconAngle}deg)`}} />
    </IonButton>
  )
}

const PlayerControls : React.FC<ControlProps> = (props) => {
  const {className, ...otherProps} = props;
  return (
    <div slot="end" className={className}>
      <div>
        <MoveButton {...otherProps} iconAngle={-45} direction={Directions.UpLeft} />
        <MoveButton {...otherProps} iconAngle={0} direction={Directions.Up} />
        <MoveButton {...otherProps} iconAngle={45} direction={Directions.UpRight} />
      </div>
      <div>
        <MoveButton {...otherProps} iconAngle={-90} direction={Directions.Left} />
        <IonButton className="player-move-button ion-no-padding" style={{opacity: 0}} disabled>
          <IonIcon icon={chevronUp} />
        </IonButton>
        <MoveButton {...otherProps} iconAngle={95} direction={Directions.Right} />
      </div>
      <div>
        <MoveButton {...otherProps} iconAngle={-135} direction={Directions.DownLeft} />
        <MoveButton {...otherProps} iconAngle={180} direction={Directions.Down} />
        <MoveButton {...otherProps} iconAngle={135} direction={Directions.DownRight} />
      </div>
    </div>
  );
}

export default PlayerControls;
