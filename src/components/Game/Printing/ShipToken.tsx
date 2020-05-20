import { MaterialComponentProps, buildOptionClasses, PrintComponentProps } from "model/Materials";
import React from "react";
import classNames from "classnames";

import { CellContentTypes } from "model/Level";
import IconToken from "./IconToken";

export const ShipComponent : React.FC = () => (
  <IconToken content={{
    type: CellContentTypes.Player
  }} />
);

export const ShipTokenPreviewComponent : React.FC<MaterialComponentProps> = ({className}) =>
  <div className={className}>
    <ShipComponent />
  </div>;

export const PrintShipTokenComponent : React.FC<PrintComponentProps> =
  ({className, buildOptionType}) =>
  <div className={classNames(className, buildOptionClasses(buildOptionType))}>
    <ShipComponent />
  </div>;
