import { IonContent, IonButton } from '@ionic/react';
import React from 'react';
import { InstructionPageProps } from '../../components/InstructionFlow';

const NewIntro: React.FC<InstructionPageProps> = ({nextUrl}) => {

  return (
    <IonContent>
      <div className="ion-text-center">
        <h2>What This Is</h2>
        <p>"Gotta Get Outta This Space" is a print, play and post game.</p>
        <p>
          To play, you'll have to print, find or make components for the
          game.
        </p>
        <p>
          You'll then captain a spaceship through
          a solar system, changing the ship as you go using
          whatever materials you have on hand.
        </p>
        <p>
          Once you've finished (assuming you succeed), you'll
          pack up the game and send it to someone else, who'll
          then do the same.
        </p>
        <p>
          <IonButton routerLink={nextUrl}>Great, let's do it!</IonButton>
        </p>
      </div>
    </IonContent>
  );
};

export default NewIntro;
