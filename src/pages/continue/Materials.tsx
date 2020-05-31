import { IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';
import React from 'react';
import { InstructionPageProps } from '../../components/InstructionFlow';
import materials from 'data/materials';

import Content from 'content/Continue/Materials.md';
import MarkdownComponent from '../../components/MarkdownComponent';

const Materials: React.FC<InstructionPageProps> = ({nextUrl}) => {

  return (
    <div className="ion-text-center page-container">
        <MarkdownComponent source={Content} />
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
                    <p>{material.description}</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            )}
          </IonRow>
        </IonGrid>
      <IonButton href={nextUrl}>
        I've got everything, let's go!
      </IonButton>
    </div>
  );
};

export default Materials;
