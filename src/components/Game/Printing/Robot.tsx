import { MaterialComponentProps, buildOptionClasses, PrintComponentProps } from "model/Materials";
import React from "react";
import classNames from "classnames";

import { CellContentTypes } from "model/Level";
import IconToken from "./IconToken";

export const RobotComponent : React.FC = () => (
  <IconToken content={{
    type: CellContentTypes.Robot
  }} />
);

export const RobotPreviewComponent : React.FC<MaterialComponentProps> = ({className}) =>
  <div className={className}>
    <RobotComponent />
  </div>;

export const PrintRobotsComponent : React.FC<PrintComponentProps> =
  ({className, buildOptionType, count}) =>
  <div className={classNames(className, buildOptionClasses(buildOptionType))}>
    {[...Array(count)].map((_, i) => (
      <RobotComponent key={i} />
    ))}
  </div>;
