import { CellContentTypes } from "../../../model/Level";
import React from "react";

import { IonButton } from "@ionic/react";
import { ControlProps } from "../Pieces";
import './CrewControls.scss';

const FuelControls : React.FC<ControlProps> = ({className, coordinates, level}) => {
  function pickUpFuel() {
    level.changeCount(coordinates, CellContentTypes.Fuel, -1);
  }
  return (
    <div slot="end" className={className}>
      <IonButton color="success" size="default"
        onClick={pickUpFuel}>
        Pick up
      </IonButton>
    </div>
  );
}

export default FuelControls;
