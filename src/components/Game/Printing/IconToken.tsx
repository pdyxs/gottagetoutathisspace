import { CellContentIcon } from "../Pieces";
import SquareCard from "components/Cards/SquareCard";
import React from "react";
import { GameCellContent } from "model/Level";
import classNames from "classnames";
import './IconToken.scss';

interface IconTokenProps {
  content: GameCellContent
}

const IconToken : React.FC<IconTokenProps> = ({content}) => (
  <SquareCard className={classNames("card","icon","token",content.type)}>
    <CellContentIcon className="detail icon" content={content} />
  </SquareCard>
);

export default IconToken;
