import { IonButton, IonItem, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { InstructionPageProps } from '../../components/InstructionFlow';
import { ShipData } from 'model/Phases';
import Content from 'content/End/SendGame.md';
import Story from 'content/End/SendGameStory.md';
import MarkdownComponent from '../../components/MarkdownComponent';
import KoFi from 'components/KoFi';
import SupportText from 'content/GameEnd/PleaseSupport.md';

const RecordLogs: React.FC<InstructionPageProps> = ({nextUrl}) => {
  const shipData = useSelector((state: any) => state.shipData) as ShipData;

  return (
    <div className="page-container">
      <h2 className="centre">And now for the long sleep</h2>
      <IonGrid className="ion-no-margin">
        <IonRow>
          <IonCol className="ion-no-margin" size="12" sizeMd="8">
            <IonItem color="notebook" className="handwritten">
              <MarkdownComponent source={Story} transformations={{...shipData}} />
            </IonItem>
            <MarkdownComponent source={Content} transformations={{...shipData}} />
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
        <IonButton className="ion-margin-bottom" routerLink={nextUrl}>
          See where you've been
        </IonButton>
      </div>
    </div>
  );
};

export default RecordLogs;
