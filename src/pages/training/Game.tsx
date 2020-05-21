import { IonContent, IonPopover, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem } from '@ionic/react';
import React, { useState } from 'react';
import { InstructionPageProps } from '../../components/InstructionFlow';

import trainingLevel from 'data/levels/training';

import GameWithRules from '../../components/GameWithRules';

import SpecialInstructions from 'content/Training/ScenarioInstructions.md';

import WinContent from 'content/Training/Win.md';
import LoseContent from 'content/Training/Lose.md';
import MarkdownComponent from 'components/MarkdownComponent';
import { useHistory } from 'react-router-dom';

const Game: React.FC<InstructionPageProps> = ({nextUrl}) => {
  const [showWinPopover, setShowWinPopover] = useState(false);
  const [showLosePopover, setShowLosePopover] = useState(false);
  const history = useHistory();

  function winLevel() {
    setShowWinPopover(true);
  }

  function loseLevel() {
    setShowLosePopover(true);
  }

  function playFull() {
    history.push(nextUrl);
  }

  function returnHome() {
    history.push('/');
  }

  return (
    <IonContent>
      <GameWithRules level={trainingLevel}
        includeControls={true} specialInstructions={SpecialInstructions}
        winLevel={winLevel}
        loseLevel={loseLevel} />
      <IonPopover isOpen={showWinPopover}
        backdropDismiss={false}
        cssClass="popoverWithCard"
        onDidDismiss={() => setShowWinPopover(false)}>
        <IonCard color="success">
          <IonCardHeader>
            <IonCardTitle>
              Congratulations!
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <MarkdownComponent className="markdown-content" source={WinContent} />
            <IonItem button color="tertiary" onClick={playFull}>
              Onward!
            </IonItem>
            <IonItem button onClick={() => setShowWinPopover(false)}>
              Whoops, pressed the wrong button
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonPopover>

      <IonPopover isOpen={showLosePopover}
        backdropDismiss={false}
        cssClass="popoverWithCard"
        onDidDismiss={() => setShowLosePopover(false)}>
        <IonCard color="light">
          <IonCardHeader>
            <IonCardTitle>
              Kaboom!
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <MarkdownComponent className="markdown-content" source={LoseContent} />
            <IonItem button color="danger" onClick={returnHome}>
              Spacerats!
            </IonItem>
            <IonItem button onClick={() => setShowLosePopover(false)}>
              Whoops, pressed the wrong button
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonPopover>
    </IonContent>
  );
};

export default Game;
