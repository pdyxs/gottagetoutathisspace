import { IonPopover, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLoading } from '@ionic/react';
import React, { useState } from 'react';
import { InstructionPageProps } from '../../components/InstructionFlow';

import GameWithRules from '../../components/GameWithRules';

import MarkdownComponent from 'components/MarkdownComponent';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayData } from 'redux/actions';
import { registerSystemResult } from 'firebaseConfig';
import { isFunction } from 'lodash';
import { StateData } from 'redux/reducer';

const Game: React.FC<InstructionPageProps> = ({
    nextUrl,
    extraProps: {
      level,
      instructions,
      win,
      lose
    }
}) => {
  const [showWinPopover, setShowWinPopover] = useState(false);
  const [showLosePopover, setShowLosePopover] = useState(false);
  const history = useHistory();
  const [busy, setBusy] = useState(false);
  const dispatch = useDispatch();
  const {
    shipData,
    shipCode,
    codeName
  } = useSelector((state: any) => state) as StateData;

  level = isFunction(level) ? level(shipData?.games.length) : level;

  function winLevel() {
    setShowWinPopover(true);
  }

  function loseLevel() {
    setShowLosePopover(true);
  }

  async function confirm(win: boolean, url: string) {
    setBusy(true);
    var game = shipData?.games[shipData.games.length - 1];
    var systemCount = game?.systems ? game.systems.length : 0;
    let data = await registerSystemResult(shipCode || '', codeName || '', systemCount, win);
    dispatch(setPlayData(data));
    history.push(url);
    setBusy(false);
  }

  async function confirmWin() {
    confirm(true, nextUrl);
  }

  async function confirmLose() {
    confirm(false, '/');
  }

  return (
    <>
      <IonLoading isOpen={busy} message="Saving Game Result..." />
      {level &&
        <GameWithRules level={level}
          includeControls={true} specialInstructions={instructions}
          winLevel={winLevel}
          loseLevel={loseLevel} />
      }
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
            <MarkdownComponent className="markdown-content" source={win} />
            <IonItem button color="tertiary" onClick={confirmWin}>
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
            <MarkdownComponent className="markdown-content" source={lose} />
            <IonItem button color="danger" onClick={confirmLose}>
              Spacerats!
            </IonItem>
            <IonItem button onClick={() => setShowLosePopover(false)}>
              Whoops, pressed the wrong button
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonPopover>
    </>
  );
};

export default Game;
