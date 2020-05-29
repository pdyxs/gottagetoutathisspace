import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton } from '@ionic/react';
import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';


interface HeaderProps {
  shipCode?: any;
  resetShip?: () => void;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({shipCode, resetShip, title}) => {
  var history = useHistory();

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" />
          <IonButton href="/">

            <IonTitle>
              <span onClick={() => history.push("/")}>Gotta Get Outta This Space</span>
              {title && `- ${title}`}
            </IonTitle>
          </IonButton>
        </IonButtons>
        {shipCode &&
          <Fragment>
            <IonTitle size="small" slot="end">Ship: {shipCode}</IonTitle>
          </Fragment>
        }
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
