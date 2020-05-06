import { IonContent } from '@ionic/react';
import React from 'react';
import { InstructionPageProps } from '../../components/InstructionFlow';

import trainingLevel from 'data/levels/training';

import GameWithRules from '../../components/GameWithRules';

import SpecialInstructions from 'content/Training/ScenarioInstructions.md';

const Game: React.FC<InstructionPageProps> = () => {

  return (
    <IonContent>
      <GameWithRules level={trainingLevel}
        includeControls={true} specialInstructions={SpecialInstructions}  />
    </IonContent>
  );
};

export default Game;
