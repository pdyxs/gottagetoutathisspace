import React from 'react';
import { IonPage, IonContent, IonCard, IonCardContent, IonRow, IonCol, IonGrid, IonItem, IonCardHeader, IonCardTitle, IonIcon } from '@ionic/react';
import Header from 'components/Header';

import BuyContent from 'content/Info/Buy.md';
import MarkdownComponent from 'components/MarkdownComponent';
import { airplaneOutline, cashOutline } from 'ionicons/icons';

const Buy: React.FC = () => {
  return (
    <div>
      <IonPage>
        <Header />
        <IonContent id="ggots-content">
          <div className="page-container why-page">
            <MarkdownComponent source={BuyContent} />
            <IonGrid>
              <IonRow className="ion-justify-content-center">
                <IonCol size="12" sizeMd="6">
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
                  <IonCol size="12" sizeMd="6">
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
          </div>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default Buy;
