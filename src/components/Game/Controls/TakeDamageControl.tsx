import React, { Fragment, useState } from 'react';
import Level from '../../../model/Level';
import { IonButton, IonPopover, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';
import './TakeDamageControl.scss';

interface TakeDamageControlProps {
  level: Level
  refresh: CallableFunction
}

const TakeDamageControl: React.FC<TakeDamageControlProps> = (props) => {
  const [showDamagePopover, setShowDamagePopover] = useState(false);
  let popover = React.useRef<HTMLIonPopoverElement>(null);
  const {level, refresh} = props;

  return (
    <Fragment>
      <IonButton color="danger" onClick={() => setShowDamagePopover(true)}>
        Take Damage
      </IonButton>
      <IonPopover
        ref={popover}
        isOpen={showDamagePopover}
        backdropDismiss={false}
        cssClass="takeDamagePopover"
        onDidDismiss={() => setShowDamagePopover(false)}>
        <IonCard color="danger">
          <IonCardHeader>
            <IonCardTitle>Brace for impact!</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            Keep close to Nature's heart... and break clear away, once in awhile,
            and climb a mountain or spend a week in the woods. Wash your spirit clean.
          </IonCardContent>
        </IonCard>
      </IonPopover>
    </Fragment>
  );
};

export default TakeDamageControl;
