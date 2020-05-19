import { IonContent, IonGrid, IonRow, IonCol } from '@ionic/react';
import React from 'react';
import { InstructionPageProps } from '../../components/InstructionFlow';

import Content from 'content/New/Make.md';
import MarkdownComponent from 'components/MarkdownComponent';
import materials from 'data/materials';
import MakeMaterialsCard from 'components/Materials/MakeMaterialsCard';

const MakeGame: React.FC<InstructionPageProps> = () => {

  return (
    <IonContent>
      <div className="ion-text-center ion-padding">
        <div className="page-container">
          <MarkdownComponent source={Content} />
        </div>
        <IonGrid>
          <IonRow>
            {materials.map((material, i) =>
              <IonCol key={i} size="12" size-sm="6" size-lg="4" size-xl="3">
                <MakeMaterialsCard material={material} />
              </IonCol>
            )}
          </IonRow>
        </IonGrid>
      </div>
    </IonContent>
  );
};

export default MakeGame;
