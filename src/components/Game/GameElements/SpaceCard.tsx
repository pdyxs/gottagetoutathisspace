import React from 'react';

import { CellContentTypes, StarTypes, PlanetTypes } from 'model/Level';
import SquareCard from 'components/Cards/SquareCard';

import './SpaceCard.scss';
import { CellContentIcon } from '../Pieces';
import pieces from '../Pieces/SpecificPieces';
import MarkdownComponent from 'components/MarkdownComponent';
import classNames from 'classnames';
import { isString } from 'lodash';
import SizedInCSS from 'components/SizedInCSS';

import BackgroundImage from 'content/Pieces/space_background.svg';

interface SpaceCardProps {
  type?: CellContentTypes,
  subtype?: StarTypes | PlanetTypes,
  variety?: number,
  className?: string
}

const SpaceCard: React.FC<SpaceCardProps> = ({className, type, subtype, variety}) => {
  var piece = type ? pieces[type] : null;
  return (
    <SquareCard className={classNames("card", "space-card", className)}
      style={{background: `url(${BackgroundImage})`}}
    >
      {piece && type &&
        <>
          <CellContentIcon className="detail" content={{type, subtype, variety}} />
          <SizedInCSS>
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
          </SizedInCSS>
        </>
      }
    </SquareCard>
  );
};

export default SpaceCard;
