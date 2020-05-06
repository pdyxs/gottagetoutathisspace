import { IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonButton, IonItem } from '@ionic/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { InstructionPageProps } from '../../components/InstructionFlow';
import materials from 'data/materials';

import Content from 'content/Continue/Materials.md';
import MarkdownComponent from '../../components/MarkdownComponent';

const Materials: React.FC<InstructionPageProps> = ({nextUrl}) => {
  const shipData = useSelector((state: any) => state.shipData);

  return (
    <IonContent>
      <div className="ion-text-center ion-padding">
        <div className="page-container">
          <MarkdownComponent source={Content} />
        </div>
        <IonGrid>
          <IonRow>
            {materials.map((material, i) =>
              <IonCol key={i} size="12" size-md="6" size-lg="4">
                <IonCard>
                  <IonCardHeader>
                    <IonCardSubtitle>{material.count}</IonCardSubtitle>
                    <IonCardTitle>{material.name}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonItem color="notebook" className="handwritten note">
                      <div className="ion-text-center" style={{margin: "0 auto"}}>
                        {material.notes(shipData)}
                      </div>
                    </IonItem>
                    <p>{material.explanation}</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            )}
          </IonRow>
        </IonGrid>
        <IonButton routerLink={nextUrl}>
          I've got everything, let's go!
        </IonButton>
      </div>
    </IonContent>
  );
};

export default Materials;
