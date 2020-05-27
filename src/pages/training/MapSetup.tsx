import { IonContent, IonButton } from '@ionic/react';
import React from 'react';
import { InstructionPageProps } from '../../components/InstructionFlow';
import GameGrid from '../../components/Game/GameGrid';

import trainingLevel from 'data/levels/training';

import Content from 'content/Training/MapSetup.md';
import MarkdownComponent from '../../components/MarkdownComponent';

const MapSetup: React.FC<InstructionPageProps> = ({nextUrl}) => {
  return (
    <IonContent>
      <div className="gameAndTextContainer">
        <div className="gameContainer">
          <GameGrid level={trainingLevel} />
        </div>
        <div className="textContainer">
          <MarkdownComponent source={Content} />
          <IonButton routerLink={nextUrl}>
            I've made the space, can I please now get out of it?
          </IonButton>
        </div>
      </div>
    </IonContent>
  );
};

export default MapSetup;
