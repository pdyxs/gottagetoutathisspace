import React from 'react';
import { useSelector } from 'react-redux';
import { InstructionPageProps } from '../../components/InstructionFlow';
import { ShipData } from 'model/Phases';

import LossText from 'content/Loss.md';
import LossText2 from 'content/Loss2.md';
import SupportText from 'content/GameEnd/PleaseSupport.md';
import MarkdownComponent from 'components/MarkdownComponent';
import { IonButton, IonItem, IonGrid, IonCol, IonRow, IonCardHeader, IonCard, IonCardTitle, IonCardContent } from '@ionic/react';
import KoFi from 'components/KoFi';

const Timeline: React.FC<InstructionPageProps> = ({nextUrl}) => {
  const shipData = useSelector((state: any) => state.shipData) as ShipData;

  return (
    <div className="page-container">
      <h2 className="centre">And so the journey ends...</h2>
      <IonGrid className="ion-no-margin">
        <IonRow>
          <IonCol className="ion-no-margin" size="12" sizeMd="8">
            <IonItem color="notebook" className="handwritten">
              <MarkdownComponent className="notebook" source={LossText} transformations={{shipName: shipData.shipName}} />
            </IonItem>
            <MarkdownComponent className="notebook" source={LossText2} transformations={{shipName: shipData.shipName}} />
          </IonCol>

          <IonCol className="ion-no-margin" size="12" sizeMd="4">
            <IonCard className="ion-no-margin">
              <IonCardHeader>
                <IonCardTitle>While you're here</IonCardTitle>
              </IonCardHeader>
              <IonCardContent className="ion-no-padding">
                <IonItem color="clear" lines="none" className="ion-margin-bottom">
                  <MarkdownComponent className="notebook" source={SupportText} />
                </IonItem>
                <IonItem color="primary">
                  <div  className="centre" style={{margin: "0 auto"}}>
                    <KoFi color="#3171e0" id="R6R81RI6R" label="Buy me a Coffee" />
                  </div>
                </IonItem>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>

      <div className="centre">
        <IonButton routerLink={nextUrl}>See the full journey</IonButton>
      </div>
    </div>
  );
};

export default Timeline;
