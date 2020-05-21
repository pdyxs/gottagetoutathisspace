import { IonContent, IonButton, IonItem } from '@ionic/react';
import React from 'react';
import { InstructionPageProps } from '../../components/InstructionFlow';
import GameGrid from '../../components/Game/GameGrid';

import trainingLevel from 'data/levels/training';

import StoryContent from 'content/Training/Story.md';
import Content from 'content/Training/MapSetup.md';
import MarkdownComponent from '../../components/MarkdownComponent';
import { useSelector } from 'react-redux';

const MapSetup: React.FC<InstructionPageProps> = ({nextUrl}) => {
  const {
    shipData,
    shipCode
  } = useSelector((state: any) => state);

  return (
    <IonContent>
      <div className="gameAndTextContainer">
        <div className="gameContainer">
          <GameGrid level={trainingLevel} />
        </div>
        <div className="textContainer">
          <h2>It's a cold night in the Robot Apocalypse...</h2>
          <IonItem color="notebook" className="handwritten">
            <MarkdownComponent source={StoryContent} transformations={{shipCode, ...shipData}} />
          </IonItem>
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
