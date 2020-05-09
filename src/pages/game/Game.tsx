import { IonContent, IonPopover, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem } from '@ionic/react';
import React, { useState } from 'react';
import { InstructionPageProps } from '../../components/InstructionFlow';

import level from 'data/levels/level02';

import GameWithRules from '../../components/GameWithRules';

import SpecialInstructions from 'content/Game/ScenarioInstructions.md';

import WinContent from 'content/Game/Win.md';
import LoseContent from 'content/Game/Lose.md';
import MarkdownComponent from 'components/MarkdownComponent';
import { useHistory } from 'react-router-dom';

const Game: React.FC<InstructionPageProps> = () => {
  const [showWinPopover, setShowWinPopover] = useState(false);
  const [showLosePopover, setShowLosePopover] = useState(false);
  const history = useHistory();

  function winLevel() {
    setShowWinPopover(true);
  }

  function loseLevel() {
    setShowLosePopover(true);
  }

  function returnHome() {
    history.push('/');
  }

  return (
    <IonContent>
      <GameWithRules level={level}
        includeControls={true} specialInstructions={SpecialInstructions}
        winLevel={winLevel}
        loseLevel={loseLevel} />
      
      <IonPopover isOpen={showWinPopover}
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
            <IonItem button color="tertiary" onClick={returnHome}>
              Huzzah!
            </IonItem>
            <IonItem button onClick={() => setShowWinPopover(false)}>
              Whoops, pressed the wrong button
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonPopover>

      <IonPopover isOpen={showLosePopover}
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
