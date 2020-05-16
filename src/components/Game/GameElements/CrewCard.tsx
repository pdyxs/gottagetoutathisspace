import React from 'react';
import SquareCard from 'components/Cards/SquareCard';

import './CrewCard.scss';
import classNames from 'classnames';

import slugify from 'slugify';
import Crew from 'model/Crew';
import { IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react';

import { returnDownForwardOutline } from "ionicons/icons";
import SizedInCSS from 'components/SizedInCSS';

interface CrewCardProps {
  crew: Crew,
  className?: string
}

const CrewCard: React.FC<CrewCardProps> = ({className, crew}) => {
  return (
    <SquareCard className={classNames(
        "card", "crew-card",  className,
        slugify(crew.name)
      )}>

      <IonGrid>
        <IonRow>
          <IonCol size="5">
            <div className="crew-profile-picture">

            </div>
          </IonCol>
          <IonCol size="7" className="right-column">
            <SizedInCSS>
              <h3>_____________</h3>
              <h4>{crew.name}</h4>
            </SizedInCSS>
          </IonCol>
        </IonRow>
      </IonGrid>

      <SizedInCSS className="power">
        <div><strong>Power:</strong> {crew.power}</div>
      </SizedInCSS>

      <SizedInCSS className="exhaust">
        <div>
          <div>Then: Exhaust</div>
          <div className="flip-icon">
            <IonIcon icon={ returnDownForwardOutline } />
          </div>
        </div>
      </SizedInCSS>
    </SquareCard>
  );
};

export default CrewCard;
