import React, {Fragment} from 'react';
import './GameCellContents.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GameCellSettings } from './Level';
import { times } from 'lodash';

interface GameCellContentsProps {
  settings: GameCellSettings
}

const GameCellContents: React.FC<GameCellContentsProps> = (props) => {
  const {settings: {type, contents}} = props;

  return (
      <div className={`game-cell ${type}`}>
        <div className="game-cell-contents-container">
          <div className="game-cell-contents">
            {contents && contents.map((content, i) => (
              <Fragment key={i}>
                {content.type == "startPosition" &&
                  <FontAwesomeIcon icon={['fas', 'space-shuttle']} size="lg" rotation={270} />
                }
                {content.type == "planet" &&
                  <div className={`planet planet-${content.subtype}`}></div>
                }
                {content.type == "star" &&
                  <div className={`star star-${content.subtype}`}></div>
                }
                {content.type == "enemy" &&
                  <div className="enemies">
                    {times(content.count || 1).map((i) => (
                      <FontAwesomeIcon className={`enemy enemy-${i+1}`} key={i} icon={['fas', 'robot']} />
                    ))}
                  </div>
                }
                {content.type == "fuel" &&
                  <div className="fuels">
                    {times(content.count || 1).map((i) => (
                      <FontAwesomeIcon className={`fuel fuel-${i+1}`} key={i} icon={['fas', 'bolt']} />
                    ))}
                  </div>
                }
                {content.type == "crew" &&
                  <div className="crews">
                    {times(content.count || 1).map((i) => (
                      <FontAwesomeIcon className={`crew crew-${i+1}`} key={i} icon={['fas', 'user']} />
                    ))}
                  </div>
                }
                {content.type == "upgrade" &&
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
