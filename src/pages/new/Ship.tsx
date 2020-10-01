import { IonButton, IonInput, IonLoading, IonPopover, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonCheckbox, IonLabel, IonText } from '@ionic/react';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InstructionPageProps } from '../../components/InstructionFlow';
import { setPlayData } from '../../redux/actions';
import Content from 'content/New/Ship.md';
import MarkdownComponent from '../../components/MarkdownComponent';
import { createNewShip } from 'firebaseConfig';
import { useHistory } from 'react-router-dom';
import { storeCodes } from 'storage';

import './Ship.scss';
import ShipCard from 'components/Game/GameElements/ShipCard';
import modules from 'data/modules';
import { ShipData } from 'model/Phases';

const NewShip: React.FC<InstructionPageProps> = ({nextUrl}) => {
  const shipData = useSelector((state: any) => state.shipData) as ShipData;
  const [nameInput, setNameInput] = useState<string>('');
  const [busy, setBusy] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [shipCode, setShipCode] = useState('');
  const [isNotFirstShip, setNotFirstShip] = useState(false);
  const [offsetCount, setOffsetCount] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();

  async function makeShip(name : string, offset: number) {
    setBusy(true);
    let playData = await createNewShip(name, offset);

    dispatch(setPlayData(playData));
    storeCodes(playData.shipCode);
    setBusy(false);
    setShipCode(playData.shipCode);
    setShowPopover(true);
  }

  const inputIsValid = nameInput.length >= 3 && (!isNotFirstShip || offsetCount > 0);

  return (
    <>
      <div className="page-container">
        <MarkdownComponent source={Content} transformations={{...shipData}} />
        <div className="ship-tour">
          <div className="top">
            <ShipCard module={modules[4]} className="show-detail" />
          </div>
          <div className="middle">
            <ShipCard module={modules[0]} className="show-detail" />
            <ShipCard module={modules[1]} className="show-detail" />
            <ShipCard module={modules[3]} className="show-detail" />
          </div>
          <div className="bottom">
            <ShipCard module={modules[2]} className="show-detail" />
          </div>
        </div>
        <div>
          <p className="centre">
            To get started, you need to give the ship a name.
          </p>
        </div>
        <form className="centre"
          onSubmit={(e) => {makeShip(nameInput, isNotFirstShip ? offsetCount : 0); e.preventDefault();}}>
          <IonLoading isOpen={busy} message="Creating Ship Record" />
          <IonInput
            value={nameInput} placeholder="Your Ship Name Here"
            onIonChange={e => setNameInput(e.detail.value!)} />
          <div className="returnCheck">
            <IonCheckbox checked={isNotFirstShip} className="checkbox" onIonChange={e => setNotFirstShip(e.detail.checked)} />
            <IonLabel>I've built a ship before</IonLabel>
          </div>
          {isNotFirstShip &&
            <IonItem className="returnCountForm">
              <IonText className="label">
                Welcome back! How many ships have you made before?
                We'll use this to make sure that you get different maps each time.
              </IonText>
              <IonInput className="playCountInput" slot="end" type="number"
                value={offsetCount} placeholder="0" onIonChange={e => setOffsetCount(e.detail.value ? parseInt(e.detail.value) : 0)}
                 />
            </IonItem>
          }
          <IonButton disabled={!inputIsValid} onClick={() => makeShip(nameInput, isNotFirstShip ? offsetCount : 0)}>Enter</IonButton>
        </form>
      </div>

      <IonPopover
        isOpen={showPopover}
        backdropDismiss={false}
        cssClass="popoverWithCard"
        onDidDismiss={() => setShowPopover(false)}>
        <IonCard color="success">
          <IonCardHeader>
            <IonCardTitle>Ship Connected!</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <p>
              The ship's serial number appears on your screen:
              <span className="ship-code">{shipCode}</span>
            </p>
            <p className="ion-margin-bottom">
              Before you continue, make sure you write it down on the Cover Sheet
               - without it, your friends won't be able to continue your journey.
            </p>
            <IonItem button onClick={() => {
              setShowPopover(false);
              history.replace(nextUrl);
            }}>
              Onward!
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonPopover>
    </>
  );
};

export default NewShip;
