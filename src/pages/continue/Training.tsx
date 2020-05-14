import { IonContent, IonButton, IonAlert } from '@ionic/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { InstructionPageProps } from '../../components/InstructionFlow';
import { ShipData } from '../../redux/actions';
import { useHistory } from 'react-router-dom';
import { baseUrl as trainingUrl } from '../training';
import { baseUrl as gameURL } from '../game';
import TrainingMission from 'content/Continue/TrainingMission.md';
import MarkdownComponent from 'components/MarkdownComponent';

const ContinueTraining: React.FC<InstructionPageProps> = () => {
  const shipData = useSelector((state: any) => state.shipData) as ShipData;
  const [showSkipCheck, setShowSkipCheck] = useState(false);
  const history = useHistory();

  return (
    <IonContent>
      <div className="page-container">
        <MarkdownComponent source={TrainingMission} transformations={{...shipData}} />

        <div className="centre">
          <IonButton routerLink={trainingUrl}>
            Let's train!
          </IonButton>

          <IonButton color="light" onClick={() => setShowSkipCheck(true)}>
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
                handler: () => history.replace(gameURL)
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
      </div>
    </IonContent>
  );
};

export default ContinueTraining;
