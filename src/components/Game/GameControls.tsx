import React, { Fragment } from 'react';
import Level from '../../model/Level';
import { IonButton } from '@ionic/react';
import TakeDamageControl from './Controls/TakeDamageControl';

interface GameControlsProps {
  level: Level
  refresh: CallableFunction
}

const GameControls: React.FC<GameControlsProps> = (props) => {
  const {level, refresh} = props;

  function updateRobots() {
    level.updateRobots();
    refresh();
  }

  return (
    <Fragment>
      <IonButton color="warning" onClick={updateRobots}>
        Move Robots
      </IonButton>
      <TakeDamageControl {...props} />
    </Fragment>
  );
};

export default GameControls;
