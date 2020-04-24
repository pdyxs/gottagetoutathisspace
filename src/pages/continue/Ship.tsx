import { IonContent, IonButton } from '@ionic/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { InstructionPageProps } from '../../components/InstructionFlow';
import { ShipData } from '../../redux/actions';

const ContinueShip: React.FC<InstructionPageProps> = ({nextUrl}) => {
  const shipData = useSelector((state: any) => state.shipData) as ShipData;

  return (
    <IonContent>
      <div className="page-container">
        <h2>Assemble your ship!</h2>
        <p>
          Before you begin, you need to assemble your ship! Take all
          the Ship Module cards and put them together. This is the state
          that the last player, _, left the ship in.
        </p>
        <h3>A tour of the ship</h3>
        <p>
          Your ship should have all the information about what each
          part does written on it.
        </p>
        <p>
          In general, different parts of the ship give you access to
          different actions. With a cockpit, you can do 1 action per
          turn. You can spend fuel (stored in the Storage Module) to
          do more actions.
        </p>
        <IonButton routerLink={nextUrl}>
          Enough with the history, let's save humanity already!
        </IonButton>
      </div>
    </IonContent>
  );
};

export default ContinueShip;
