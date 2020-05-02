import React, {Fragment} from 'react';
import './GameCellContents.css';
import { times } from 'lodash';
import Level, { GameCellSettings, Coords } from '../../model/Level';
import { CellContentIcon } from './Pieces';

interface GameCellContentsProps {
  settings: GameCellSettings,
  coordinates: Coords,
  level: Level,
  includeControls: boolean
}

const GameCellContents: React.FC<GameCellContentsProps> = (props) => {
  const {settings: {type, contents}} = props;

  return (
      <div className={`game-cell ${type}`}>
        <div className="game-cell-contents-container">
          <div className="game-cell-contents">
            {contents && contents.map((content, i) => (
              <Fragment key={i}>
                {content.count === undefined &&
                  <CellContentIcon content={content} />
                }
                {((content?.count || 0) > 0) &&
                  <div className={`ggo-icon-container ggo-icon-container-${content.type}`}>
                    {times(content.count || 0).map((i) => (
                      <CellContentIcon content={content} className={`${content.type}-${i+1}`} key={i} />
                    ))}
                  </div>
                }
              </Fragment>
            ))}
          </div>
        </div>
      </div>
  );
};

export default GameCellContents;
