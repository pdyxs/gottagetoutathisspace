import { IonHeader, IonToolbar, IonButtons, IonTitle, IonButton, IonMenu, IonContent, IonList, IonItem, IonMenuButton, IonIcon, IonLabel } from '@ionic/react';
import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { home, helpOutline, chatbubbleEllipsesOutline, peopleOutline, ellipsisHorizontalOutline, cardOutline, cashOutline, musicalNotesOutline, codeSlashOutline } from "ionicons/icons";

interface HeaderProps {
  shipCode?: any;
  resetShip?: () => void;
  title?: string;
  menuid?: string;
}

const Header: React.FC<HeaderProps> = ({shipCode, menuid, resetShip, title}) => {
  var history = useHistory();

  return (
    <>
      <IonMenu side="start" contentId={menuid}>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Gotta Get Outta This Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem href="/">
              <IonIcon slot="start" icon={home} />
              <IonLabel>Home</IonLabel>
            </IonItem>
            <IonItem href="/">
              <IonIcon slot="start" icon={peopleOutline} />
              <IonLabel>Who made this</IonLabel>
            </IonItem>
            <IonItem href="/">
              <IonIcon slot="start" icon={helpOutline} />
              <IonLabel>Why?</IonLabel>
            </IonItem>
            <IonItem href="/">
              <IonIcon slot="start" icon={chatbubbleEllipsesOutline} />
              <IonLabel>I want to talk to you</IonLabel>
            </IonItem>
            <IonItem href="/">
              <IonIcon slot="start" icon={ellipsisHorizontalOutline} />
              <IonLabel>I want more</IonLabel>
            </IonItem>
            <IonItem color="tertiary">
              <IonTitle>Money Stuff</IonTitle>
            </IonItem>
            <IonItem href="/">
              <IonIcon slot="start" icon={cardOutline} />
              <IonLabel>Buy a nice deck</IonLabel>
            </IonItem>
            <IonItem href="/">
              <IonIcon slot="start" icon={cashOutline} />
              <IonLabel>Support Us</IonLabel>
            </IonItem>
            <IonItem color="tertiary">
              <IonTitle>Just Coz</IonTitle>
            </IonItem>
            <IonItem href="/" target="_blank">
              <IonIcon slot="start" icon={musicalNotesOutline} />
              <IonLabel>Official Playlist</IonLabel>
            </IonItem>
            <IonItem href="/" target="_blank">
              <IonIcon slot="start" icon={codeSlashOutline} />
              <IonLabel>Source Code</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonButton href="/">
              <IonTitle>
                <span onClick={() => history.push("/")}>Gotta Get Outta This Space</span>
                {title && `- ${title}`}
              </IonTitle>
            </IonButton>
          </IonButtons>
          {shipCode &&
            <Fragment>
              <IonTitle size="small" slot="end">Ship: {shipCode}</IonTitle>
            </Fragment>
          }
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default Header;
