import { IonContent, IonButton } from '@ionic/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { InstructionPageProps } from '../../components/InstructionFlow';
import Content from 'content/Continue/History.md';
import MarkdownComponent from '../../components/MarkdownComponent';
import { ShipData } from 'model/Phases';

const ContinueHistory: React.FC<InstructionPageProps> = ({nextUrl}) => {
  const shipData = useSelector((state: any) => state.shipData) as ShipData;

  return (
    <div className="page-container">
      <MarkdownComponent source={Content}
        transformations={{...shipData}} />
      <IonButton href={nextUrl}>
        Enough with the history, let's save humanity already!
      </IonButton>
    </div>
  );
};

export default ContinueHistory;
