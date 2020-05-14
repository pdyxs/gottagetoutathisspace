import React from 'react';
import SquareCard from 'components/Cards/SquareCard';

import './ShipCard.scss';
import classNames from 'classnames';
import ShipModule from 'model/Module';

import slugify from 'slugify';

interface ShipCardProps {
  module: ShipModule,
  className?: string
}

const ShipCard: React.FC<ShipCardProps> = ({className, module}) => {
  return (
    <SquareCard className={classNames(
        "card", "ship-card",  className,
        slugify(module.name)
      )}>
      {module && module.name &&
        <h3>{module.name}</h3>
      }
      {module.basicEffects.map((effect, i) =>
        <p className={classNames('effect', `effect-${i}`)}>
          {effect}
        </p>
      )}
    </SquareCard>
  );
};

export default ShipCard;
