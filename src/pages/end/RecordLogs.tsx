import { IonContent, IonButton, IonInput, IonLoading } from '@ionic/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { InstructionPageProps } from '../../components/InstructionFlow';
import { ShipData } from '../../redux/actions';
import Content from 'content/End/RecordLogs.md';
import MarkdownComponent from '../../components/MarkdownComponent';
import { saveGameData } from 'firebaseConfig';
import { useHistory } from 'react-router-dom';

const minCodeLength = 5;

const RecordLogs: React.FC<InstructionPageProps> = ({nextUrl}) => {
  const shipData = useSelector((state: any) => state.shipData) as ShipData;
  const shipCode = useSelector((state: any) => state.shipCode);
  const [codenameInput, setCodenameInput] = useState('');
  const [busy, setBusy] = useState(false);
  const history = useHistory();

  async function setCodename(code : string) {
    setBusy(true);
    await saveGameData(shipCode, {survived: true, nextCodename: code});
    setBusy(false);
    history.push(nextUrl);
  }

  return (
    <IonContent>
      <div className="page-container">
        <MarkdownComponent source={Content} transformations={{...shipData}} />
        <form className="centre"
          onSubmit={(e) => {codenameInput.length >= minCodeLength && setCodename(codenameInput); e.preventDefault();}}>
          <IonLoading isOpen={busy} message="Updating Database" />
          <IonInput
            value={codenameInput} placeholder="Enter Codename Here"
            onIonChange={e => setCodenameInput(e.detail.value!)} />
          <IonButton disabled={codenameInput.length < minCodeLength} onClick={() => setCodename(codenameInput)}>Records Complete</IonButton>
        </form>
      </div>
    </IonContent>
  );
};

export default RecordLogs;
