import { MaterialComponentProps, buildOptionClasses, PrintComponentProps } from "model/Materials";
import React from "react";
import classNames from "classnames";

import SquareCard from "components/Cards/SquareCard";

import SizedInCSS from "components/SizedInCSS";

export const LogbookComponent : React.FC = () => (
  <SquareCard className={classNames("card","log-book")}>
    <SizedInCSS>

    </SizedInCSS>
  </SquareCard>
);

export const LogbookPreviewComponent : React.FC<MaterialComponentProps> = ({className}) =>
  <div className={className}>
    <LogbookComponent />
  </div>;

export const PrintLogbookComponent : React.FC<PrintComponentProps> =
  ({className, buildOptionType}) =>
  <div className={classNames(className, buildOptionClasses(buildOptionType))}>
    <LogbookComponent />
  </div>;
