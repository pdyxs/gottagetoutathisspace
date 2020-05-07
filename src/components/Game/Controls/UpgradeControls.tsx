import React, { useState } from "react";

import { IonButton, IonPopover, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from "@ionic/react";
import { ControlProps } from "../Pieces";
import './CrewControls.scss';
//import MarkdownComponent from "components/MarkdownComponent";

const UpgradeControls : React.FC<ControlProps> = ({className}) => {
  const [showPopover, setShowPopover] = useState(false);
  return (
    <div slot="end" className={className}>
      <IonButton color="success" size="default" onClick={() => setShowPopover(true)}>
        Pick up
      </IonButton>
      <IonPopover
        isOpen={showPopover}
        backdropDismiss={false}
        cssClass="popoverWithCard"
        onDidDismiss={() => setShowPopover(false)}>
        <IonCard color="success">
          <IonCardHeader>
            <IonCardTitle>Brace for impact!</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            Hello
          </IonCardContent>
        </IonCard>
      </IonPopover>
    </div>
  );
}

export default UpgradeControls;
