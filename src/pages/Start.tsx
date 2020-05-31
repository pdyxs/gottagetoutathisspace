import { IonContent, IonPage, IonButton, IonFooter, IonItem, IonIcon, IonLabel, IonGrid, IonRow, IonCol } from '@ionic/react';
import React from 'react';
import './Start.scss';
import Content from 'content/Start.md';
import ReactMarkdown from 'react-markdown';
import { CellContentIcon } from 'components/Game/Pieces';
import { CellContentTypes, StarTypes, PlanetTypes } from 'model/Level';
import { useSelector, useDispatch } from 'react-redux';
import defaultPage from './defaults';
import { clearCodes } from 'storage';
import { clearPlayData } from 'redux/actions';
import LoadShipIfPossible from 'components/LoadShipIfPossible';
import { helpOutline, peopleOutline, ellipsisHorizontalOutline, chatbubbleEllipsesOutline, cardOutline, cashOutline, musicalNotesOutline, codeSlashOutline } from 'ionicons/icons';

const Start: React.FC = () => {
  const stateData = useSelector((state: any) => state);
  const {shipCode} = stateData;
  const dispatch = useDispatch();

  async function reset() {
    dispatch(clearPlayData());
    await clearCodes();
  }

  return (
    <IonPage>
      <LoadShipIfPossible />
      <IonContent>
        <div className="startPage ion-text-center startPage">
          <ReactMarkdown source={Content} />

          <div>
            <IonButton
              size="large"
              routerLink="/continue"
              onClick={reset}
              color="primary">
              I got a strange package in the mail
            </IonButton>
          </div>
          <div>
            <IonButton
              size="large"
              routerLink="/new"
              onClick={reset}
              color="primary">
              I didn't, but this sounds fun
            </IonButton>
          </div>
          {shipCode &&
            <div>
              <IonButton
                size="large"
                routerLink={defaultPage(stateData)}
                color="light">
                I want to continue with ship {shipCode}
              </IonButton>
            </div>
          }

          <CellContentIcon className="star" content={{
            type: CellContentTypes.Star,
            subtype: StarTypes.Yellow
          }} />
          <CellContentIcon className="planet" content={{
            type: CellContentTypes.Planet,
            subtype: PlanetTypes.Rocky,
            variety: 2
          }} />

          <CellContentIcon className="robot robot-1" content={{
            type: CellContentTypes.Robot
          }} />

          <CellContentIcon className="robot robot-2" content={{
            type: CellContentTypes.Robot
          }} />

          <CellContentIcon className="robot robot-3" content={{
            type: CellContentTypes.Robot
          }} />

          <CellContentIcon className="ship" content={{
            type: CellContentTypes.Player
          }} />
        </div>

        <IonGrid className="page-container">
          <IonRow className="ion-justify-content-center">
            <IonCol size="8" size-md="6" size-lg="4">
              <IonItem lines="none" color="clear" routerLink="/who">
                <IonIcon slot="start" icon={peopleOutline} />
                <IonLabel>Who made this</IonLabel>
              </IonItem>
              <IonItem lines="none" color="clear" routerLink="/why">
                <IonIcon slot="start" icon={helpOutline} />
                <IonLabel>Why?</IonLabel>
              </IonItem>
              <IonItem lines="none" color="clear" routerLink="/contact">
                <IonIcon slot="start" icon={chatbubbleEllipsesOutline} />
                <IonLabel>I want to talk to you</IonLabel>
              </IonItem>
              <IonItem lines="none" color="clear" routerLink="/more">
                <IonIcon slot="start" icon={ellipsisHorizontalOutline} />
                <IonLabel>I want more</IonLabel>
              </IonItem>
            </IonCol>
            <IonCol size="8" size-md="6" size-lg="4">
              <IonItem disabled lines="none" color="clear" routerLink="/buy">
                <IonIcon slot="start" icon={cardOutline} />
                <IonLabel>Buy a nice deck</IonLabel>
              </IonItem>
              <IonItem disabled lines="none" color="clear" routerLink="/support-us">
                <IonIcon slot="start" icon={cashOutline} />
                <IonLabel>Support Us</IonLabel>
              </IonItem>
            </IonCol>
            <IonCol size="8" size-md="6" size-lg="4">
              <IonItem lines="none" color="clear" href="https://open.spotify.com/playlist/4cOim4pWFKu5r55hteThnZ?si=-Gqj5cjURO2WVQ4cuaCV9Q" target="_blank" rel="noopener noreferrer">
                <IonIcon slot="start" icon={musicalNotesOutline} />
                <IonLabel>Official Playlist</IonLabel>
              </IonItem>
              <IonItem lines="none" color="clear" href="https://github.com/pdyxs/gottagetouttathisspace" target="_blank" rel="noopener noreferrer">
                <IonIcon slot="start" icon={codeSlashOutline} />
                <IonLabel>Source Code</IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>

        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Start;
