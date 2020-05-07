import { IonContent, IonButton } from '@ionic/react';
import React from 'react';
import { InstructionPageProps } from '../../components/InstructionFlow';
import GameGrid from '../../components/Game/GameGrid';

import level from 'data/levels/level02';

import Content from 'content/Game/MapSetup.md';
import MarkdownComponent from '../../components/MarkdownComponent';

const MapSetup: React.FC<InstructionPageProps> = ({nextUrl}) => {

  return (
    <IonContent>
      <div className="ion-text-center" style={{marginBottom: '4em'}}>
        <MarkdownComponent source={Content} />
        <GameGrid level={level} />
        <IonButton routerLink={nextUrl} className="ion-margin-bottom">
          I've made the space, can I please now get out of it?
        </IonButton>
      </div>
    </IonContent>
  );
};

export default MapSetup;
