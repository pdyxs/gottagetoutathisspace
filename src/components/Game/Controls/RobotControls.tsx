import { CellContentTypes } from "../../../model/Level";
import React from "react";

import { IonButton, IonIcon } from "@ionic/react";
import { remove, add } from "ionicons/icons";
import { ControlProps } from "../Pieces";

const RobotControls : React.FC<ControlProps> = ({className, coordinates, level}) => {
  function changeCount(contentType: CellContentTypes, delta: number) {
    level.changeCount(coordinates, contentType, delta);
  }
  return (
    <div slot="end" className={className}>
      <IonButton color="warning" className="ion-no-padding" size="default"
        disabled={!level.hasAtLeastOneOf(coordinates, CellContentTypes.Robot)}
        onClick={() => changeCount(CellContentTypes.Robot, -1)}>
        <IonIcon icon={remove} />
      </IonButton>
      <IonButton color="warning" className="ion-no-padding" size="default"
        onClick={() => changeCount(CellContentTypes.Robot, 1)}>
        <IonIcon icon={add} />
      </IonButton>
    </div>
  );
}

export default RobotControls;
