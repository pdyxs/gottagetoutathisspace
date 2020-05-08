import { IonContent, IonButton, IonInput, IonLoading } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShipData, ShipData } from '../../redux/actions';
import { useHistory } from 'react-router-dom';
import { getShipData } from '../../firebaseConfig';
import { toast } from '../../toast';
import { storeShipCode } from '../../storage';
import { InstructionPageProps } from '../../components/InstructionFlow';

import Content from 'content/Continue/Intro.md';
import ReactMarkdown from 'react-markdown';
import { isNil } from 'lodash';

const minCodeLength = 3;

const ContinueIntro: React.FC<InstructionPageProps> = ({nextUrl}) => {
  const shipCode = useSelector((state: any) => state.shipCode);
  const [codeInput, setCodeInput] = useState<string>(shipCode || '');
  const [busy, setBusy] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  async function setCode(code : string) {
    setBusy(true);
    const shipData = await getShipData(code);
    if (shipData == null) {
      toast(`Couldn't find a ship with code ${code}`);
      setBusy(false);
    } else {
      dispatch(setShipData(code, shipData as ShipData));
      storeShipCode(code);
      setBusy(false);
      history.push(nextUrl);
    }
  }

  useEffect(() => {
    if (!isNil(shipCode) && codeInput === '') {
      setCodeInput(shipCode);
    }
  }, [codeInput, shipCode]);

  return (
    <IonContent>
      <div className="page-container">
        <ReactMarkdown source={Content} />
        <form onSubmit={(e) => {codeInput.length >= minCodeLength && setCode(codeInput); e.preventDefault();}}>
          <IonLoading isOpen={busy} message="Checking Serial Number" />
          <IonInput
            value={codeInput} placeholder="Enter Serial Number Here"
            onIonChange={e => setCodeInput(e.detail.value!)} />
          <IonButton disabled={codeInput.length < minCodeLength} onClick={() => setCode(codeInput)}>Enter</IonButton>
        </form>
      </div>
    </IonContent>
  );
};

export default ContinueIntro;
