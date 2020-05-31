import { IonHeader, IonToolbar, IonButtons, IonTitle, IonMenu, IonContent, IonList, IonItem, IonMenuButton, IonIcon, IonLabel } from '@ionic/react';
import React, { Fragment } from 'react';
import { home, helpOutline, chatbubbleEllipsesOutline, peopleOutline, ellipsisHorizontalOutline, cardOutline, cashOutline, musicalNotesOutline, codeSlashOutline } from "ionicons/icons";

interface HeaderProps {
  shipCode?: any;
  resetShip?: () => void;
  title?: string
}

const Header: React.FC<HeaderProps> = ({shipCode, title}) => {


  return (
    <>
      <IonMenu side="start" contentId="ggots-content">
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
            <IonItem href="/who">
              <IonIcon slot="start" icon={peopleOutline} />
              <IonLabel>Who made this</IonLabel>
            </IonItem>
            <IonItem href="/why">
              <IonIcon slot="start" icon={helpOutline} />
              <IonLabel>Why?</IonLabel>
            </IonItem>
            <IonItem href="/contact">
              <IonIcon slot="start" icon={chatbubbleEllipsesOutline} />
              <IonLabel>I want to talk to you</IonLabel>
            </IonItem>
            <IonItem href="/more">
              <IonIcon slot="start" icon={ellipsisHorizontalOutline} />
              <IonLabel>I want more</IonLabel>
            </IonItem>
            <IonItem color="tertiary">
              <IonTitle>Money Stuff</IonTitle>
            </IonItem>
            <IonItem href="/buy">
              <IonIcon slot="start" icon={cardOutline} />
              <IonLabel>Buy a nice deck</IonLabel>
            </IonItem>
            <IonItem href="/support-us">
              <IonIcon slot="start" icon={cashOutline} />
              <IonLabel>Support Us</IonLabel>
            </IonItem>
            <IonItem color="tertiary">
              <IonTitle>Just Coz</IonTitle>
            </IonItem>
            <IonItem href="https://open.spotify.com/playlist/4cOim4pWFKu5r55hteThnZ?si=-Gqj5cjURO2WVQ4cuaCV9Q" target="_blank" rel="noopener noreferrer">
              <IonIcon slot="start" icon={musicalNotesOutline} />
              <IonLabel>Official Playlist</IonLabel>
            </IonItem>
            <IonItem href="https://github.com/pdyxs/gottagetouttathisspace" target="_blank" rel="noopener noreferrer">
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
          </IonButtons>
          <IonTitle>
            Gotta Get Outta This Space
            {title && `- ${title}`}
          </IonTitle>
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
