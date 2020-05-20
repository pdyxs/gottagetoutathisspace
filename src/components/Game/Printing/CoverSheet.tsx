import { MaterialComponentProps, buildOptionClasses, PrintComponentProps } from "model/Materials";
import React from "react";
import classNames from "classnames";

import SquareCard from "components/Cards/SquareCard";

import StartContent from 'content/Start.md';
import ReactMarkdown from "react-markdown";

import './CoverSheet.scss';
import SizedInCSS from "components/SizedInCSS";
import { CellContentIcon } from "../Pieces";
import { CellContentTypes, StarTypes, PlanetTypes } from "model/Level";

export const CoverSheetComponent : React.FC = () => (
  <SquareCard className={classNames("card","cover-sheet")}>
    <SizedInCSS>
      <ReactMarkdown className="header" source={StartContent} />
      <CellContentIcon className="detail star" content={{
        type: CellContentTypes.Star,
        subtype: StarTypes.Yellow
      }} />
      <CellContentIcon className="detail planet" content={{
        type: CellContentTypes.Planet,
        subtype: PlanetTypes.Rocky,
        variety: 2
      }} />
      <div className="instructions">
        <p className="website">
          To play, go to gottagetouttathis.space
        </p>
        <div className="shipCodeInstructions">
          Your ship code:
          <div className="shipCodeSpace"></div>
        </div>
      </div>
    </SizedInCSS>
  </SquareCard>
);

export const CoverSheetPreviewComponent : React.FC<MaterialComponentProps> = ({className}) =>
  <div className={className}>
    <CoverSheetComponent />
  </div>;

export const PrintCoverSheetComponent : React.FC<PrintComponentProps> =
  ({className, buildOptionType}) =>
  <div className={classNames(className, buildOptionClasses(buildOptionType))}>
    <CoverSheetComponent />
  </div>;
