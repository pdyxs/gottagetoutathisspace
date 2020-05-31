import { IonContent, IonButton } from '@ionic/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { InstructionPageProps } from '../../components/InstructionFlow';
import { ShipData } from 'model/Phases';
import Content from 'content/Continue/Ship.md';
import MarkdownComponent from '../../components/MarkdownComponent';

const ContinueShip: React.FC<InstructionPageProps> = ({nextUrl}) => {
  const shipData = useSelector((state: any) => state.shipData) as ShipData;
  const lastGame = shipData?.games[shipData.games.length - 2];

  return (
    <div className="page-container">
      <MarkdownComponent source={Content} transformations={{...shipData}} />
      <div className="centre">
        {lastGame &&
          <div>
            <img alt="the state of this ship left by the last player "
              style={{maxHeight: '450px'}}
              src={lastGame.finalShipURL} />
          </div>
        }
        <IonButton className="ion-margin-bottom" href={nextUrl}>
          Great! Let's do this!
        </IonButton>
      </div>
    </div>
  );
};

export default ContinueShip;
