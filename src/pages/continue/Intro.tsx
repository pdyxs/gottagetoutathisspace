import { IonContent, IonButton, IonInput, IonLoading } from '@ionic/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setShipData, ShipData } from '../../redux/actions';
import { useHistory } from 'react-router-dom';
import { getShipData } from '../../firebaseConfig';
import { toast } from '../../toast';
import { storeShipCode } from '../../storage';
import { InstructionPageProps } from '../../components/InstructionFlow';

const minCodeLength = 3;

const ContinueIntro: React.FC<InstructionPageProps> = ({nextUrl}) => {
  const [codeInput, setCodeInput] = useState<string>('');
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

  return (
    <IonContent>
      <div className="ion-text-center">
        <h2>What This Is</h2>
        <p>"Gotta Get Outta This Space" is a print, play and post game.</p>
        <p>
          You're going to be captaining a spaceship through
          a solar system, changing the ship as you go using
          whatever materials you have on hand.
        </p>
        <p>
          Once you've finished (assuming you succeed), you'll
          pack up the game and send it to someone else, who'll
          then do the same.
        </p>
        <p>
          To begin, please enter the code on your ship.
        </p>
        <p>
          <IonLoading isOpen={busy} message="Checking Code" />
          <IonInput value={codeInput} placeholder="Enter Code Here"
            onIonChange={e => setCodeInput(e.detail.value!)}></IonInput>
          <IonButton disabled={codeInput.length < minCodeLength} onClick={e => setCode(codeInput)}>Enter</IonButton>
        </p>
      </div>
    </IonContent>
  );
};

export default ContinueIntro;
