import React from 'react';
import Level from '../model/Level';
import './GameWithRules.scss';
import GameGrid from './Game/GameGrid';
import GameRules from './Rules';

interface GameWithRulesProps {
  level: Level,
  includeControls?: boolean,
  specialInstructions?: string,
  winLevel?: () => void,
  loseLevel?: () => void
}

const GameWithRules: React.FC<GameWithRulesProps> = (
  {level, includeControls, specialInstructions, winLevel, loseLevel}
) => {
  return (
    <div className="gameAndRulesContainer">
      <table className="gameAndRulesTable">
        <tbody>
          <tr>
            <td className="gameContainer">
              <GameGrid level={level} includeControls={includeControls}
                winLevel={winLevel} loseLevel={loseLevel} />
            </td>
            <td className="rulesContainer">
              <GameRules level={level} specialInstructions={specialInstructions} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GameWithRules;
