import { IonContent, IonButton, IonInput, IonLoading } from '@ionic/react';
import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { InstructionPageProps } from '../../components/InstructionFlow';
import { ShipData } from '../../redux/actions';
import Content from 'content/End/RecordLogs.md';
import Content2 from 'content/End/RecordLogs2.md';
import MarkdownComponent from '../../components/MarkdownComponent';
import { saveGameData, uploadFile } from 'firebaseConfig';
import { useHistory } from 'react-router-dom';
import {useDropzone} from 'react-dropzone'
import classNames from 'classnames';
import './RecordLogs.scss';

const minCodeLength = 5;

const RecordLogs: React.FC<InstructionPageProps> = ({nextUrl}) => {
  const shipData = useSelector((state: any) => state.shipData) as ShipData;
  const shipCode = useSelector((state: any) => state.shipCode);
  const [codenameInput, setCodenameInput] = useState('');
  const [busy, setBusy] = useState(false);
  const history = useHistory();

  const [chosenFileURL, setChosenFileURL] = useState('');
  const [chosenFile, setChosenFile] = useState<File>();

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length === 0) return;
    if (!acceptedFiles[0].type.startsWith('image')) return;

    setChosenFile(acceptedFiles[0]);
    setChosenFileURL(URL.createObjectURL(acceptedFiles[0]));
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  async function updateRecords(code : string) {
    if (!chosenFile) return;
    setBusy(true);
    let imageURL = await uploadFile(shipCode, 1, chosenFile);
    await saveGameData(shipCode, {survived: true, nextCodename: code});
    setBusy(false);
    history.push(nextUrl);
  }

  return (
    <IonContent>
      <div className="page-container record-logs">
        <MarkdownComponent source={Content} transformations={{...shipData}} />
        <div {...getRootProps()} className={classNames('dropzone', {
            isDragging: isDragActive
          })}>
          <input {...getInputProps()} />
          <div className="preview" style={{
            backgroundImage: `url(${chosenFileURL})`}} />
          <div className="instructions">
            Drag and drop the image of your ship here, or click to choose a file
          </div>
        </div>
        <MarkdownComponent source={Content2} transformations={{...shipData}} />
        <form className="centre"
          onSubmit={(e) => {codenameInput.length >= minCodeLength && updateRecords(codenameInput); e.preventDefault();}}>
          <IonLoading isOpen={busy} message="Updating Database" />
          <IonInput
            value={codenameInput} placeholder="Enter Codename Here"
            onIonChange={e => setCodenameInput(e.detail.value!)} />
          <IonButton disabled={codenameInput.length < minCodeLength || chosenFile === null}
            onClick={() => updateRecords(codenameInput)}>Records Complete!</IonButton>
        </form>
      </div>
    </IonContent>
  );
};

export default RecordLogs;
