import React from 'react';
import SquareCard from 'components/Cards/SquareCard';

import './CrewCard.scss';
import classNames from 'classnames';

import slugify from 'slugify';
import Crew from 'model/Crew';
import { IonIcon } from '@ionic/react';

import { returnDownForwardOutline } from "ionicons/icons";

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

      <div className="crew-profile-picture">
      </div>
      <h3>_____________</h3>
      <h4>
        {crew.name}
      </h4>
      <p className="power">
        <strong>Power:</strong> {crew.power}
      </p>
      <div className="exhaust">
        <div>Then: Exhaust</div>
        <div className="flip-icon">
          <IonIcon size="large" icon={ returnDownForwardOutline } />
        </div>
      </div>
    </SquareCard>
  );
};

export default CrewCard;
