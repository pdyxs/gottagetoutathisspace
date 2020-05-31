import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { InstructionPageProps } from '../../components/InstructionFlow';
import { ShipData } from 'model/Phases';
import { IonGrid, IonRow, IonCol, IonImg, IonPopover, IonCard, IonCardContent, IonButton } from '@ionic/react';

import './Timeline.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

const Timeline: React.FC<InstructionPageProps> = ({nextUrl, extraProps: { buttonText }}) => {
  const shipData = useSelector((state: any) => state.shipData) as ShipData;
  const [popupImage, setPopupImage] = useState("");


  return (
    <>
      <div className="page-container timeline">
        <h2 className="centre">The journey of {shipData.shipName}</h2>
        <IonGrid>
          <IonRow>
            <IonCol size="5" className="left side">
              <div className="description">
                {shipData.shipName} begins it's journey
              </div>
            </IonCol>
            <IonCol size="2" className="middle-top">
              <div className="hline hline-left" />
              <div className="line" />
            </IonCol>
            <IonCol size="5" className="right side">
            </IonCol>
          </IonRow>
          {shipData.games.map((game, i) => (
            <IonRow key={i}>
              {game.systems.length === 3 && game.systems[2].won &&
                <>
                  <IonCol size="5" className="left side">
                    {(i % 2 === 1) &&
                      <>
                        <img alt="The state of the ship at the end of this game" onClick={() => setPopupImage(game.finalShipURL || '')} className="finalShipImage" src={game.finalShipURL} />
                        <div className="description hasImage">
                          {game.systems[game.systems.length - 1].name || '(Unnamed System)'}
                        </div>
                      </>
                    }
                  </IonCol>
                  <IonCol size="2" className="middle">
                    <div className={classNames("hline", {
                      "hline-right": i % 2 === 0,
                      "hline-left": i % 2 === 1
                    })} />
                    <div className="line" />
                  </IonCol>
                  <IonCol size="5" className="right side">
                    {(i % 2 === 0) &&
                      <>
                        <img alt="The state of the ship at the end of this game" onClick={() => setPopupImage(game.finalShipURL || '')} className="finalShipImage" src={game.finalShipURL} />
                        <div className="description hasImage">
                          {game.systems[game.systems.length - 1].name || '(Unnamed System)'}
                        </div>
                      </>
                    }
                  </IonCol>
                </>
              }
              {(game.systems.length !== 0 && game.systems[game.systems.length - 1].won === false) &&
                <IonCol size="12" className="middle continuing">
                  <div className="line-dotted" />
                  <FontAwesomeIcon className="dead" icon={['fas', 'tombstone']} />
                  <p className="dead-describe">
                    {shipData.shipName} was destroyed in the system {game.systems[game.systems.length - 1].name || '(Unknown)'}
                  </p>
                </IonCol>
              }
              {!(game.systems.length === 3 && game.systems[2].won) && (game.systems.length === 0 || (game.systems[game.systems.length - 1].won !== false)) &&
                <IonCol size="12" className="middle continuing">
                  <div className="line-dotted" />
                  ...The journey continues
                </IonCol>
              }
            </IonRow>
          ))}

        </IonGrid>

        <div className="centre">
          <IonButton routerLink={nextUrl}>{buttonText}</IonButton>
        </div>
      </div>
      <IonPopover isOpen={popupImage !== ''}
        cssClass="image-popover"
        onDidDismiss={() => setPopupImage('')}>
        <IonCard>
          <IonCardContent>
            <IonImg className="image" src={popupImage} />
          </IonCardContent>
        </IonCard>
      </IonPopover>
    </>
  );
};

export default Timeline;
