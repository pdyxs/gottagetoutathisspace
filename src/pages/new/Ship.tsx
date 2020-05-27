import { IonContent, IonButton, IonInput, IonLoading } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InstructionPageProps } from '../../components/InstructionFlow';
import { ShipData, DefaultShipData, setShipData, clearShipData } from '../../redux/actions';
import Content from 'content/New/Ship.md';
import MarkdownComponent from '../../components/MarkdownComponent';
import { GetRandomShipCode, checkIfShipExists, saveShipData } from 'firebaseConfig';
import { clone } from 'lodash';
import { useHistory } from 'react-router-dom';
import { storeShipCode, clearShipCode } from 'storage';

import './Ship.scss';
import ShipCard from 'components/Game/GameElements/ShipCard';
import modules from 'data/modules';

const NewShip: React.FC<InstructionPageProps> = ({nextUrl}) => {
  const shipData = useSelector((state: any) => state.shipData) as ShipData;
  const [shipCode, setShipCode] = useState<string>();
  const [nameInput, setNameInput] = useState<string>('');
  const [busy, setBusy] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    async function findRandomCode() : Promise<string> {
      const testShipCode = GetRandomShipCode();
      const exists = await checkIfShipExists(testShipCode);
      if (exists) {
        return findRandomCode();
      }
      return testShipCode;
    }

    clearShipCode();
    clearShipData();

    findRandomCode().then((code: string) => {
      setShipCode(code);
    });
  }, []);

  async function setName(name : string) {
    if (!shipCode) return;
    setBusy(true);
    const shipData : ShipData = clone(DefaultShipData);
    shipData.shipName = name;
    await saveShipData(shipCode, shipData);

    dispatch(setShipData(shipCode, shipData as ShipData));
    storeShipCode(shipCode);
    setBusy(false);
    history.push(nextUrl);
  }

  return (
    <IonContent>
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
          <p>
            This ship's official designation will be
            <span className="ship-code">{shipCode}</span>
            - you and those who come after you can enter that to see its progress.
            Write it on your cover sheet, so you don't lose it.
          </p>
          <p>
            But before we start, you need to give it a name.
          </p>
        </div>
        <form className="centre"
          onSubmit={(e) => {setName(nameInput); e.preventDefault();}}>
          <IonLoading isOpen={busy} message="Creating Ship Record" />
          <IonInput
            value={nameInput} placeholder="Your Ship Name Here"
            onIonChange={e => setNameInput(e.detail.value!)} />
          <IonButton disabled={shipCode === undefined || nameInput.length === 0} onClick={() => setName(nameInput)}>Enter</IonButton>
        </form>
      </div>
    </IonContent>
  );
};

export default NewShip;
