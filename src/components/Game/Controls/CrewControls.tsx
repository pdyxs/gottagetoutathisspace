import React from "react";

import { IonButton } from "@ionic/react";
import { ControlProps } from "../Pieces";
import './CrewControls.scss';

const CrewControls : React.FC<ControlProps> = ({className}) => {
  return (
    <div slot="end" className={className}>
      <IonButton color="success" size="default">
        Pick up
      </IonButton>
    </div>
  );
}

export default CrewControls;
