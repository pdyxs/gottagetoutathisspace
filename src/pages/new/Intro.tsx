import { IonContent, IonButton } from '@ionic/react';
import React from 'react';
import { InstructionPageProps } from '../../components/InstructionFlow';

import Content from 'content/New/Intro.md';
import MarkdownComponent from 'components/MarkdownComponent';

const NewIntro: React.FC<InstructionPageProps> = ({baseUrl, nextUrl, futurePages}) => {

  return (
    <IonContent>
      <div className="page-container">
        <MarkdownComponent source={Content} />
        <div className="centre">
          <IonButton routerLink={nextUrl}>Great, how do I make a copy of the game?</IonButton>
          <IonButton routerLink={`${baseUrl}/${futurePages[1].url}`}>I've already got a copy and am ready to go!</IonButton>
        </div>
      </div>
    </IonContent>
  );
};

export default NewIntro;
