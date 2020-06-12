import React from 'react';
import { IonPage, IonContent, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonCardHeader, IonCardTitle, IonItem, IonIcon } from '@ionic/react';
import Header from 'components/Header';

import SupportContent from 'content/Info/Support.md';
import SupportContent2 from 'content/Info/Support2.md';
import MarkdownComponent from 'components/MarkdownComponent';
import { cashOutline, airplaneOutline } from 'ionicons/icons';
import KoFi from 'components/KoFi';

const Support: React.FC = () => {
  return (
    <div>
      <IonPage>
        <Header />
        <IonContent id="ggots-content">
          <div className="page-container why-page">
            <MarkdownComponent source={SupportContent} />

            <IonGrid>
              <IonRow className="ion-justify-content-center">
                <IonCol size="12" sizeMd="4">
                  <IonCard className="ion-no-margin">
                    <IonCardHeader>
                      <IonCardTitle>Buy me a coffee</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent className="ion-no-padding">
                      <IonItem>Get some warm fuzzies</IonItem>
                      <IonItem>
                        <IonIcon slot="start" icon={cashOutline} />
                        Cost: $3 AUD per coffee
                      </IonItem>
                      <IonItem></IonItem>
                      <IonItem>
                        We get all of it
                      </IonItem>
                      <IonItem color="primary">
                        <div  className="centre" style={{margin: "0 auto"}}>
                          <KoFi color="#3171e0" id="R6R81RI6R" label="Buy me a Coffee" />
                        </div>
                      </IonItem>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol size="12" sizeMd="4">
                  <IonCard className="ion-no-margin">
                    <IonCardHeader>
                      <IonCardTitle>Buy the Deluxe Edition</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent className="ion-no-padding">
                      <IonItem>Get a copy of the game (including all tokens)</IonItem>
                      <IonItem>
                        <IonIcon slot="start" icon={cashOutline} />
                        Cost: $50 AUD<br />
                        Includes shipping
                      </IonItem>
                      <IonItem>
                        <IonIcon slot="start" icon={airplaneOutline} />
                        Only delivers to Australia</IonItem>
                      <IonItem>
                        We get ~$20
                      </IonItem>
                      <IonItem className="centre" color="success" rel="noopener noreferrer" target="_blank" button href="https://ko-fi.com/s/aade9f26b4">
                        Buy the Deluxe Edition
                      </IonItem>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                  <IonCol size="12" sizeMd="4">
                    <IonCard className="ion-no-margin">
                      <IonCardHeader>
                        <IonCardTitle>Buy the cards</IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent className="ion-no-padding">
                        <IonItem>Get a copy of the game's cards</IonItem>
                        <IonItem>
                          <IonIcon slot="start" icon={cashOutline} />
                          Cost: $29.90 AUD<br />
                          plus shipping
                        </IonItem>
                        <IonItem>
                          <IonIcon slot="start" icon={airplaneOutline} />
                          Delivers worldwide
                        </IonItem>
                        <IonItem>
                          We get ~$5
                        </IonItem>
                        <IonItem className="centre" color="warning" rel="noopener noreferrer" target="_blank" button href="https://www.makeplayingcards.com/sell/marketplace/gotta-get-outta-this-space.html">
                          Buy the Cards
                        </IonItem>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
              </IonRow>
            </IonGrid>

            <MarkdownComponent source={SupportContent2} />
          </div>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default Support;
