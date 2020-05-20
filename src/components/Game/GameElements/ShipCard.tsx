import React from 'react';
import SquareCard from 'components/Cards/SquareCard';

import './ShipCard.scss';
import classNames from 'classnames';
import ShipModule from 'model/Module';

import slugify from 'slugify';
import SizedInCSS from 'components/SizedInCSS';
import { IonImg } from '@ionic/react';

import BackgroundImage from 'content/Pieces/ship_background.svg';

interface ShipCardProps {
  module?: ShipModule,
  className?: string
}

const ShipCard: React.FC<ShipCardProps> = ({className, module}) => {
  return (
    <SquareCard className={classNames(
        "card", "ship-card",  className,
        slugify(module?.name || ''), {
        [`ship-card-${module?.type}`]: module
      })}
      style={{background: `url(${BackgroundImage})`}}
      >
      {module &&
        <>
          {module.imageURL &&
            <IonImg src={module.imageURL} className="module-img detail" />
          }
          {module.targetImageURL &&
            <IonImg src={module.targetImageURL} className="target-img" />
          }
          <SizedInCSS>
            {module.name &&
                <h3>{module.name}</h3>
            }
            {module.basicEffects.map((effect, i) =>
              <p key={i} className={classNames('effect', `effect-${i}`)}>
                {effect}
              </p>
            )}
          </SizedInCSS>
        </>
      }

      <SizedInCSS>
        <div className="damage-text">
          Damage
        </div>
        <div className="damage-container">
          {[...Array(module?.damageSlots || 3)].map((_,i) => (
            <div key={i} className={`damage-square damage-square-${i}`}>
            </div>
          ))}
        </div>
      </SizedInCSS>
    </SquareCard>
  );
};

export default ShipCard;
