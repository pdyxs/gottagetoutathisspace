import { IonContent, IonButton } from '@ionic/react';
import React from 'react';
import { InstructionPageProps } from '../../components/InstructionFlow';
import GameGrid from '../../components/Game/GameGrid';

import trainingLevel from '../../levels/training';

import Content from 'content/Training/MapSetup.md';
import MarkdownComponent from '../../components/MarkdownComponent';

const MapSetup: React.FC<InstructionPageProps> = ({nextUrl}) => {

  return (
    <IonContent>
      <div className="ion-text-center">
        <MarkdownComponent source={Content} />
        <GameGrid level={trainingLevel} />
        <IonButton routerLink={nextUrl}>
          I've made the space, can I please now get out of it?
        </IonButton>
      </div>
    </IonContent>
  );
};

export default MapSetup;
