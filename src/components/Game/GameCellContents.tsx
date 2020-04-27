import React, {Fragment} from 'react';
import './GameCellContents.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { times } from 'lodash';
import Level, { GameCellSettings, Coords, CellContentTypes } from '../../model/Level';

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
                {content.type === CellContentTypes.Player &&
                  <FontAwesomeIcon icon={['fas', 'space-shuttle']} size="lg" rotation={270} />
                }
                {content.type === CellContentTypes.Planet &&
                  <div className={`planet planet-${content.subtype}`}></div>
                }
                {content.type === CellContentTypes.Star &&
                  <div className={`star star-${content.subtype}`}></div>
                }
                {content.type === CellContentTypes.Robot &&
                  <div className="enemies">
                    {times(content.count || 0).map((i) => (
                      <FontAwesomeIcon className={`enemy enemy-${i+1}`} key={i} icon={['fas', 'robot']} />
                    ))}
                  </div>
                }
                {content.type === CellContentTypes.Fuel &&
                  <div className="fuels">
                    {times(content.count || 1).map((i) => (
                      <FontAwesomeIcon className={`fuel fuel-${i+1}`} key={i} icon={['fas', 'bolt']} />
                    ))}
                  </div>
                }
                {content.type === CellContentTypes.Crew &&
                  <div className="crews">
                    {times(content.count || 1).map((i) => (
                      <FontAwesomeIcon className={`crew crew-${i+1}`} key={i} icon={['fas', 'user']} />
                    ))}
                  </div>
                }
                {content.type === CellContentTypes.Upgrade &&
                  <div className="upgrades">
                    {times(content.count || 1).map((i) => (
                      <FontAwesomeIcon className={`upgrade upgrade-${i+1}`} key={i} icon={['fas', 'tools']} />
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
