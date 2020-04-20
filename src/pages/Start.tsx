import { IonContent, IonPage, IonButton } from '@ionic/react';
import React from 'react';
import './Start.css';

const Start: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="ion-text-center">
          <p>The robot uprising was swift and brutal</p>
          <p>This ship is one of the few that survived</p>
          <p>Now it's time to run</p>
          <p className="ion-no-margin ion-margin-top">Now, you've</p>

          <h1 className="ion-no-margin ion-margin-bottom">Gotta Get Outta This Space</h1>

          <div>
            <IonButton
              routerLink="/continue"
              color="primary">
              I got a strange package in the mail
            </IonButton>
          </div>
          <div>
            <IonButton
              routerLink="/new"
              color="primary">
              I didn't, but this sounds fun
            </IonButton>
          </div>

        </div>

        <div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Start;
