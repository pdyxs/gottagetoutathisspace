import { IonButton } from '@ionic/react';
import React from 'react';
import { InstructionPageProps } from '../../components/InstructionFlow';

import Content from 'content/New/Intro.md';
import MarkdownComponent from 'components/MarkdownComponent';

const NewIntro: React.FC<InstructionPageProps> = ({baseUrl, nextUrl, futurePages}) => {

  return (
    <div className="page-container">
      <MarkdownComponent source={Content} />
      <div className="centre">
        <IonButton href={nextUrl}>Great, how do I make a copy of the game?</IonButton>
      </div>
    </div>
  );
};

export default NewIntro;
