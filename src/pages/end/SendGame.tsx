import { IonButton, IonItem } from '@ionic/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { InstructionPageProps } from '../../components/InstructionFlow';
import { ShipData } from 'model/Phases';
import Content from 'content/End/SendGame.md';
import Story from 'content/End/SendGameStory.md';
import MarkdownComponent from '../../components/MarkdownComponent';

const RecordLogs: React.FC<InstructionPageProps> = ({nextUrl}) => {
  const shipData = useSelector((state: any) => state.shipData) as ShipData;

  return (
    <div className="page-container">
      <h2 className="centre">And now for the long sleep</h2>
      <IonItem color="notebook" className="handwritten">
        <MarkdownComponent source={Story} transformations={{...shipData}} />
      </IonItem>
      <MarkdownComponent source={Content} transformations={{...shipData}} />
      <div className="centre">
        <IonButton className="ion-margin-bottom" href={nextUrl}>
          End
        </IonButton>
      </div>
    </div>
  );
};

export default RecordLogs;
