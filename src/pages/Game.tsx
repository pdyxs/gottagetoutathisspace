import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import level from 'data/levels/level03';
import GameWithRules from '../components/GameWithRules';

const Game: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <GameWithRules level={level} />
      </IonContent>
    </IonPage>
  );
};

export default Game;
