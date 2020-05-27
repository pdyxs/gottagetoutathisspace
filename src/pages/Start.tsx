import { IonContent, IonPage, IonButton } from '@ionic/react';
import React from 'react';
import './Start.scss';
import Content from 'content/Start.md';
import ReactMarkdown from 'react-markdown';
import { CellContentIcon } from 'components/Game/Pieces';
import { CellContentTypes, StarTypes, PlanetTypes } from 'model/Level';

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

          <CellContentIcon className="star" content={{
            type: CellContentTypes.Star,
            subtype: StarTypes.Yellow
          }} />
          <CellContentIcon className="planet" content={{
            type: CellContentTypes.Planet,
            subtype: PlanetTypes.Rocky,
            variety: 2
          }} />

        </div>

        <div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Start;
