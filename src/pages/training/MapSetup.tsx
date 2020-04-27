import { IonContent } from '@ionic/react';
import React from 'react';
import { InstructionPageProps } from '../../components/InstructionFlow';
import GameGrid from '../../components/Game/GameGrid';

import trainingLevel from '../../levels/training';

const MapSetup: React.FC<InstructionPageProps> = () => {

  return (
    <IonContent>
      <div className="ion-text-center">
        <h2>Training</h2>
        <GameGrid level={trainingLevel} />
      </div>
    </IonContent>
  );
};

export default MapSetup;
