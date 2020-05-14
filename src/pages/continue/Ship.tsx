import { IonContent, IonButton } from '@ionic/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { InstructionPageProps } from '../../components/InstructionFlow';
import { ShipData } from '../../redux/actions';
import Content from 'content/Continue/Ship.md';
import MarkdownComponent from '../../components/MarkdownComponent';

const ContinueShip: React.FC<InstructionPageProps> = ({nextUrl}) => {
  const shipData = useSelector((state: any) => state.shipData) as ShipData;

  return (
    <IonContent>
      <div className="page-container">
        <MarkdownComponent source={Content} transformations={{...shipData}} />
        <img alt="the state of this ship left by the last player " src="/assets/last_ship.jpg" />
        <div className="centre">
          <IonButton className="ion-margin-bottom" routerLink={nextUrl}>
            Great! Let's do this!
          </IonButton>
        </div>
      </div>
    </IonContent>
  );
};

export default ContinueShip;
