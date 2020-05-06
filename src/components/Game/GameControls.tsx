import React, { Fragment } from 'react';
import './GameCell.css';
import Level from '../../model/Level';
import { IonButton } from '@ionic/react';

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
      <IonButton color="danger">
        Take Damage
      </IonButton>
    </Fragment>
  );
};

export default GameControls;
