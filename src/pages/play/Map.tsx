import { IonButton, IonItem, IonInput, IonLoading } from '@ionic/react';
import React, { useState } from 'react';
import { InstructionPageProps } from '../../components/InstructionFlow';

import MarkdownComponent from '../../components/MarkdownComponent';
import { useSelector, useDispatch } from 'react-redux';

import './Map.scss';
import SquareCard from 'components/Cards/SquareCard';
import { CellContentIcon } from 'components/Game/Pieces';
import { CellContentTypes, StarTypes } from 'model/Level';
import SizedInCSS from 'components/SizedInCSS';
import { startNewSystem } from 'firebaseConfig';
import { setPlayData } from 'redux/actions';
import { useHistory } from 'react-router-dom';
import { upgradeLevel, survivorLevel } from 'data/levels';
import { StateData } from 'redux/reducer';

const MapSetup: React.FC<InstructionPageProps> = ({
    nextUrl, className,
    extraProps: {
      header,
      story
    }
  }) => {
  const {
    shipData,
    shipCode,
    codeName
  } = useSelector((state: any) => state) as StateData;
  const [systemName, setSystemName] = useState('');
  const transformations = {
    shipCode,
    ...shipData,
    systemName: systemName !== '' ? systemName : 'Unknown'
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const [busy, setBusy] = useState(false);

  async function onClickNext() {
    if (!shipData || !shipCode) return;
    setBusy(true);
    var game = shipData.games[shipData.games.length - 1];
    var systemCount = game.systems ? game.systems.length : 0;
    let data = await startNewSystem(shipCode, codeName || '', systemCount + 1, systemName);
    dispatch(setPlayData(data));
    history.push(nextUrl);
    setBusy(false);
  }

  const uLevelStar = upgradeLevel(shipData?.games.length || 0)?.mainStar;
  const sLevelStar = survivorLevel(shipData?.games.length || 0)?.mainStar;

  return (
    <>
      <IonLoading isOpen={busy} message="Getting System Data..." />
      <div className="page-container ion-text-center map-page">
        <MarkdownComponent source={header} transformations={transformations} />
        <IonItem color="notebook" className="handwritten">
          <MarkdownComponent source={story} transformations={transformations} />
        </IonItem>
        <h4 className="systemInputContainer">
          This System's Name:
          <IonInput onIonChange={e => setSystemName(e.detail.value || '')}
            className="systemInput" type="text" placeholder="Enter system name here" />
        </h4>
        <SquareCard className="map">
          <SizedInCSS>
            <CellContentIcon className="fuelStar map-object"
              content={{type: CellContentTypes.Star, subtype: StarTypes.BlueGiant}} />
            <CellContentIcon className="upgradeStar map-object"
              content={{type: CellContentTypes.Star, subtype: uLevelStar}} />
            <CellContentIcon className="survivorStar map-object"
              content={{type: CellContentTypes.Star, subtype: sLevelStar}} />
            <CellContentIcon className="ship map-object"
              content={{type: CellContentTypes.Player}} />
            <CellContentIcon className="survivor map-object"
              content={{type: CellContentTypes.Crew}} />
            <svg className="lines" viewBox="0 0 100 100" >
              <path className="full-line" d="M -10 34 Q 50 -31 120 58" />
              <path className="progress-line" d="M -10 34 Q 50 -31 120 58" />
            </svg>
          </SizedInCSS>
        </SquareCard>
        <IonButton onClick={onClickNext}>
          Let's Set This Space Up
        </IonButton>
      </div>
    </>
  );
};

export default MapSetup;
