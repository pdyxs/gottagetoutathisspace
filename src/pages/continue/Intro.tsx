import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonPopover } from '@ionic/react';
import React, { useState } from 'react';
import './Intro.css';

const ContinueIntro: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="ion-text-center">
          <p>"Gotta Get Outta This Space" is a print, play and post game.</p>
          <p>
            You're going to be guiding a spaceship through
            a solar system, changing the ship as you go using
            whatever materials you have on hand.
          </p>
          <p>
            Once you've finished (assuming you succeed), you'll
            pack up the game and send it to someone else, who'll
            then do the same.
          </p>
          <p>
            To begin, please enter the code on your ship.
          </p>
        </div>

        <div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ContinueIntro;
