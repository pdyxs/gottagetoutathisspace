import { IonContent, IonButton, IonItem, IonIcon, IonLabel } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { InstructionPageProps } from '../../components/InstructionFlow';
import GameGrid from '../../components/Game/GameGrid';

import MarkdownComponent from '../../components/MarkdownComponent';
import { flatten, filter, find, isNil, floor } from 'lodash';
import Level, { CellTypes, CellContentTypes, GameCellSettings } from 'model/Level';
import { useSelector, useDispatch } from 'react-redux';
import { add, remove } from "ionicons/icons";
import { setPlayerCount } from 'redux/actions';

const MapSetup: React.FC<InstructionPageProps> = ({
    nextUrl,
    extraProps: {
      level: l,
      instructions
    }
}) => {
  let {
    playerCount
  } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const [refreshCount, setRefresh] = useState(0);

  playerCount = playerCount || 1;
  const level:Level = l;

  const playerPositions = filter(flatten(level.grid),
    cell => cell.type !== CellTypes.Blank &&
            !isNil(find(cell.contents, c => c.type === CellContentTypes.Crew))
  );

  function addPlayer() {
    dispatch(setPlayerCount(playerCount + 1));
  }

  function removePlayer() {
    dispatch(setPlayerCount(playerCount - 1));
  }

  useEffect(() => {
    var hasChanged = false;
    for (var i = 0; i !== playerPositions.length; ++i) {
      let content = playerPositions[i].contents?.find(c => c.type === CellContentTypes.Crew);
      if (!content) return;
      var position = content.variety || (i + 1);
      if (position > playerCount) {
        if (content.count != 0) {
          content.count = 0;
          hasChanged = true;
        }
      } else {
        var newVal = floor((playerCount - position) / playerPositions.length) + 1;
        if (content.count != newVal) {
          content.count = newVal;
          hasChanged = true;
        }
      }
    }
    if (hasChanged) {
      setRefresh(refreshCount + 1);
    }
  }, [playerCount, playerPositions])

  return (
    <IonContent>
      <div className="gameAndTextContainer">
        <div className="gameContainer">
          <GameGrid level={level} />
        </div>
        <div className="textContainer">
          <MarkdownComponent source={instructions} />
          {playerPositions.length > 0 &&
            <IonItem color="notebook" style={{width: "300px", margin: "0 auto"}}>
              <IonLabel>There are</IonLabel>
              <IonButton onClick={removePlayer} disabled={playerCount <= 1} size="small"><IonIcon icon={remove} /></IonButton>
              <IonLabel style={{maxWidth: "20px", textAlign: 'center'}}>{playerCount}</IonLabel>
              <IonButton onClick={addPlayer} disabled={playerCount >= 4} size="small"><IonIcon icon={add} /></IonButton>
              <IonLabel className="ion-padding-start">players</IonLabel>
            </IonItem>
          }
          <IonButton routerLink={nextUrl}>
            I've made the space, can I please now get out of it?
          </IonButton>
        </div>
      </div>
    </IonContent>
  );
};

export default MapSetup;
