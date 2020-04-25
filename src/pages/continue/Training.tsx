import { IonContent, IonButton, IonAlert } from '@ionic/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { InstructionPageProps } from '../../components/InstructionFlow';
import { ShipData } from '../../redux/actions';
import { useHistory } from 'react-router-dom';
import { baseUrl as trainingUrl } from '../training';

const ContinueTraining: React.FC<InstructionPageProps> = ({nextUrl, futurePages}) => {
  const shipData = useSelector((state: any) => state.shipData) as ShipData;
  const [showSkipCheck, setShowSkipCheck] = useState(false);
  const history = useHistory();

  return (
    <IonContent>
      <div className="page-container">
        <h2>Let's do a training mission!</h2>
        <p>
          When you chart the SS {shipData.shipName}'s path through
          your solar system, you’ll only get one chance to avoid the
          horrible robots coming for you! So we’ve put together a
          training simulation to help you… well… not destroy the
          remainder of the human race.
        </p>
        <IonButton routerLink={trainingUrl}>
          Great! Let's do this!
        </IonButton>

        <IonButton onClick={() => setShowSkipCheck(true)}>
          Screw that! I don't need no training!
        </IonButton>
        <IonAlert
          isOpen={showSkipCheck}
          onDidDismiss={() => setShowSkipCheck(false)}
          header={'Are you sure?'}
          message={'Learning is, in fact, how you learn stuff'}
          buttons={[
            {
              text: 'Yes! Skip to the game already!',
              cssClass: 'danger',
              handler: () => history.replace(futurePages[0].url)
            },
            {
              text: 'Sure, I guess I should train first',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => history.replace(trainingUrl)
            }
          ]}
        />
      </div>
    </IonContent>
  );
};

export default ContinueTraining;
