import { IonContent } from '@ionic/react';
import React from 'react';
import { InstructionPageProps } from '../../components/InstructionFlow';

import trainingLevel from '../../levels/training';

import GameWithRules from '../../components/GameWithRules';

const Game: React.FC<InstructionPageProps> = () => {

  return (
    <IonContent>
      <GameWithRules level={trainingLevel} includeControls={true} />
    </IonContent>
  );
};

export default Game;
