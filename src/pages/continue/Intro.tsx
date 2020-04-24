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
      <div className="page-container">
        <h2>What This Is</h2>
        <p>"Gotta Get Outta This Space" is a print, play and post game.</p>
        <p>
          The spaceship that’s been sent to your solar system is one of
          the last remaining human ships in the galaxy. Your goal is to
          guide it safely through your solar system, picking up supplies
          (and hopefully you!) as you go.
        </p>
        <p>
          As your ship gets improved and damaged, you’ll change the board
          game components in front of you, writing on some pieces,
          destroying others, and making new ones with whatever materials
          you have on hand.
        </p>
        <p>
          Once you've finished (assuming you do, in fact, get outta
            this space), you'll pack up the game and send it to
            someone else, who'll then do the same.
        </p>
        <p>
          Together, you’re charting a path out of the galaxy - if you
          make it, you can escape the grasp of the new robot overlords!
        </p>
        <p>
          To begin, please enter the serial number of your ship.
        </p>
        <p>
          <IonLoading isOpen={busy} message="Checking Serial Number" />
          <IonInput value={codeInput} placeholder="Enter Serial Number Here"
            onIonChange={e => setCodeInput(e.detail.value!)}></IonInput>
          <IonButton disabled={codeInput.length < minCodeLength} onClick={e => setCode(codeInput)}>Enter</IonButton>
        </p>
      </div>
    </IonContent>
  );
};

export default ContinueIntro;
