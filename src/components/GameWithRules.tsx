import React from 'react';
import Level from '../model/Level';
import './GameWithRules.scss';
import GameGrid from './Game/GameGrid';
import GameRules from './Rules';

interface GameWithRulesProps {
  level: Level,
  includeControls?: boolean
}

const GameWithRules: React.FC<GameWithRulesProps> = ({level, includeControls}) => {
  return (
    <div className="gameAndRulesContainer">
      <table className="gameAndRulesTable">
        <tbody>
          <tr>
            <td className="gameContainer">
              <GameGrid level={level} includeControls={includeControls} />
            </td>
            <td className="rulesContainer">
              <GameRules level={level} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GameWithRules;
