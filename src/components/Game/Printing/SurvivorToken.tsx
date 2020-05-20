import { MaterialComponentProps, buildOptionClasses, PrintComponentProps } from "model/Materials";
import React from "react";
import classNames from "classnames";

import { CellContentTypes } from "model/Level";
import IconToken from "./IconToken";

export const SurvivorComponent : React.FC = () => (
  <IconToken content={{
    type: CellContentTypes.Crew
  }} />
);

export const SurvivorTokenPreviewComponent : React.FC<MaterialComponentProps> = ({className}) =>
  <div className={className}>
    <SurvivorComponent />
  </div>;

export const PrintSurvivorTokenComponent : React.FC<PrintComponentProps> =
  ({className, buildOptionType}) =>
  <div className={classNames(className, buildOptionClasses(buildOptionType))}>
    <SurvivorComponent />
  </div>;
