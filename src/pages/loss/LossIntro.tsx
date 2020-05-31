import React from 'react';
import { useSelector } from 'react-redux';
import { InstructionPageProps } from '../../components/InstructionFlow';
import { ShipData } from 'model/Phases';

import LossText from 'content/Loss.md';
import MarkdownComponent from 'components/MarkdownComponent';
import { IonButton } from '@ionic/react';

const Timeline: React.FC<InstructionPageProps> = ({nextUrl}) => {
  const shipData = useSelector((state: any) => state.shipData) as ShipData;

  return (
    <div className="page-container">
      <MarkdownComponent source={LossText} transformations={{shipName: shipData.shipName}} />

      <div className="centre">
        <IonButton routerLink={nextUrl}>See the full journey</IonButton>
      </div>
    </div>
  );
};

export default Timeline;
