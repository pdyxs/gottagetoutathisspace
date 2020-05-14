import React from 'react';

import { CellContentTypes, StarTypes, PlanetTypes } from 'model/Level';
import SquareCard from 'components/Cards/SquareCard';

import './SpaceCard.scss';
import { CellContentIcon } from '../Pieces';
import pieces from '../Pieces/SpecificPieces';
import MarkdownComponent from 'components/MarkdownComponent';
import classNames from 'classnames';
import { isString } from 'lodash';

interface SpaceCardProps {
  type: CellContentTypes,
  subtype?: StarTypes | PlanetTypes,
  variety?: number,
  className?: string
}

const SpaceCard: React.FC<SpaceCardProps> = ({className, type, subtype, variety}) => {
  var piece = pieces[type];
  return (
    <SquareCard className={classNames("card", "space-card", className)}>
      <CellContentIcon className="detail" content={{type, subtype, variety}} />
      {piece && piece.name &&
        <h3>
          {isString(piece.name) ? piece.name : piece.name[subtype || '']}
        </h3>
      }
      {piece?.cardText &&
        <MarkdownComponent
          className={classNames(`space-card-effect`, type, {
            [`${type}-${subtype}`]: subtype,
            [`${type}-${subtype}-${variety}`]: variety
          })}
          transformations={{type, subtype, variety}}
          source={piece.cardText || ''} />
      }
    </SquareCard>
  );
};

export default SpaceCard;
