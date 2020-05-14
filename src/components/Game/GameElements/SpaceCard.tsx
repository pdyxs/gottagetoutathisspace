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
  variety?: number
}

const SpaceCard: React.FC<SpaceCardProps> = ({type, subtype, variety}) => {
  var piece = pieces[type];
  return (
    <SquareCard className="space-card">
      <CellContentIcon content={{type, subtype, variety}} />
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
