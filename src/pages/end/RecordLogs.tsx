import { IonButton, IonInput, IonLoading, IonCheckbox, IonItem, IonText } from '@ionic/react';
import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InstructionPageProps } from '../../components/InstructionFlow';
import Content from 'content/End/RecordLogs.md';
import Content2 from 'content/End/RecordLogs2.md';
import MarkdownComponent from '../../components/MarkdownComponent';
import { saveGameData, uploadFile } from 'firebaseConfig';
import { useHistory } from 'react-router-dom';
import {useDropzone} from 'react-dropzone'
import classNames from 'classnames';
import './RecordLogs.scss';
import { StateData } from 'redux/reducer';
import { setPlayData } from 'redux/actions';

const minCodeLength = 5;

const RecordLogs: React.FC<InstructionPageProps> = ({nextUrl}) => {
  const {shipCode, codeName, shipData} = useSelector((state: any) => state) as StateData;
  const [codenameInput, setCodenameInput] = useState('');
  const [busy, setBusy] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const [chosenFileURL, setChosenFileURL] = useState('');
  const [chosenFile, setChosenFile] = useState<File>();
  const [allowUse, setAllowUse] = useState(true);

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length === 0) return;
    if (!acceptedFiles[0].type.startsWith('image')) return;

    setChosenFile(acceptedFiles[0]);
    setChosenFileURL(URL.createObjectURL(acceptedFiles[0]));
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  async function updateRecords(code : string) {
    if (!chosenFile || !shipCode) return;
    setBusy(true);
    let imageURL = await uploadFile(shipCode, shipData?.games.length || 1, chosenFile);
    let data = await saveGameData(shipCode, codeName || '', imageURL, code, allowUse);
    dispatch(setPlayData(data));
    setBusy(false);
    history.push(nextUrl);
  }

  function updateCodenameInput(newCode: string) {
    setCodenameInput(newCode.replace(/\s/g,''));
  }

  return (
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
      <div className="dropCheck">
        <IonItem>
          <IonCheckbox slot="start" checked={allowUse} onIonChange={e => setAllowUse(e.detail.checked)} />
          <IonText>
            I allow the game's creators to use this image and other recorded details of this playthrough in social media and other marketing materials
          </IonText>
        </IonItem>
      </div>
      <MarkdownComponent source={Content2} transformations={{...shipData}} />
      <form className="centre"
        onSubmit={(e) => {codenameInput.length >= minCodeLength && updateRecords(codenameInput); e.preventDefault();}}>
        <IonLoading isOpen={busy} message="Updating Database" />
        <IonInput
          value={codenameInput} placeholder="Enter Codename Here"
          onIonChange={e => updateCodenameInput(e.detail.value!)} />
        <IonButton disabled={(codenameInput.length < minCodeLength) || (!chosenFile)}
          onClick={() => updateRecords(codenameInput)}>Records Complete!</IonButton>
      </form>
    </div>
  );
};

export default RecordLogs;
