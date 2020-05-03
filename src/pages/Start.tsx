import { IonContent, IonPage, IonButton } from '@ionic/react';
import React from 'react';
import './Start.scss';
import Content from 'content/Start.md';
import ReactMarkdown from 'react-markdown';

const Start: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="startPage ion-text-center startPage">
          <ReactMarkdown source={Content} />

          <div>
            <IonButton
              size="large"
              routerLink="/continue"
              color="primary">
              I got a strange package in the mail
            </IonButton>
          </div>
          <div>
            <IonButton
              size="large"
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
