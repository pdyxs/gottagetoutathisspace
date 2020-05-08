import React, { Fragment } from 'react';
import Level from '../../model/Level';
import { IonButton } from '@ionic/react';
import TakeDamageControl from './Controls/TakeDamageControl';

interface GameControlsProps {
  level: Level
  refresh: CallableFunction,
  winLevel?: () => void,
  loseLevel?: () => void
}

const GameControls: React.FC<GameControlsProps> = (props) => {
  const {level, refresh, winLevel, loseLevel} = props;

  function updateRobots() {
    level.updateRobots();
    refresh();
  }

  function resetLevel() {
    level.reset();
    refresh();
  }

  return (
    <Fragment>
      <div>
        <IonButton color="warning" onClick={updateRobots}>
          Move Robots
        </IonButton>
        <TakeDamageControl {...props} />
        <IonButton color="light" onClick={resetLevel}>
          Reset Map
        </IonButton>
      </div>
      <div className="ion-margin-top">
        {winLevel &&
          <IonButton color="success" onClick={winLevel}>
            I Got Outta This Space
          </IonButton>
        }
        {loseLevel &&
          <IonButton color="light" onClick={loseLevel}>
            The Ship Exploded
          </IonButton>
        }
      </div>
    </Fragment>
  );
};

export default GameControls;
