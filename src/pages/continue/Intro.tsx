import { IonContent, IonButton, IonInput, IonLoading } from '@ionic/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPlayData, setCodename } from '../../redux/actions';
import { useHistory } from 'react-router-dom';
import { getShipData } from '../../firebaseConfig';
import { toast } from '../../toast';
import { storeCodes } from '../../storage';
import { InstructionPageProps } from '../../components/InstructionFlow';

import Content from 'content/Continue/Intro.md';
import MarkdownComponent from 'components/MarkdownComponent';

const minCodeLength = 3;

const ContinueIntro: React.FC<InstructionPageProps> = ({nextUrl}) => {
  const [shipCodeInput, setShipCodeInput] = useState<string>('');
  const [codeNameInput, setCodeNameInput] = useState<string>('');
  const [busy, setBusy] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  async function setCode() {
    setBusy(true);
    const playData = await getShipData(shipCodeInput, codeNameInput);
    if (playData == null) {
      toast(`Couldn't find a ship with serial number ${shipCodeInput}`);
      setBusy(false);
    } else {
      dispatch(setPlayData(playData));
      dispatch(setCodename(codeNameInput));
      storeCodes(shipCodeInput, codeNameInput);
      setBusy(false);
      history.push(nextUrl);
    }
  }

  return (
    <IonContent>
      <div className="page-container">
        <MarkdownComponent source={Content} />
        <form className="centre">
          <IonLoading isOpen={busy} message="Checking Ship Code" />
          <IonInput
            value={shipCodeInput} placeholder="Enter Ship Code Here"
            onIonChange={e => setShipCodeInput(e.detail.value!)} />
          <IonInput
            value={codeNameInput} placeholder="Enter Codename Here"
            onIonChange={e => setCodeNameInput(e.detail.value!)} />
          <IonButton disabled={shipCodeInput.length < minCodeLength} onClick={() => setCode()}>Enter</IonButton>
        </form>
      </div>
    </IonContent>
  );
};

export default ContinueIntro;
