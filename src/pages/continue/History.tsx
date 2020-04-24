import { IonContent, IonButton } from '@ionic/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { InstructionPageProps } from '../../components/InstructionFlow';
import { ShipData } from '../../redux/actions';

const ContinueHistory: React.FC<InstructionPageProps> = ({nextUrl}) => {
  const shipData = useSelector((state: any) => state.shipData) as ShipData;

  return (
    <IonContent>
      <div className="page-container">
        <h2>Welcome to the SS {shipData.shipName}</h2>
        <p>
          This ship has made it through {shipData.levelsComplete} star
          systems so far… here’s hoping that you’ll make it one more!</p>
        <p>
          You can see the path charted by the SS {shipData.shipName} below!
        </p>
        <IonButton routerLink={nextUrl}>
          Enough with the history, let's save humanity already!
        </IonButton>
      </div>
    </IonContent>
  );
};

export default ContinueHistory;
