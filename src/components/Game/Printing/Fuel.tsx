import { MaterialComponentProps, buildOptionClasses, PrintComponentProps } from "model/Materials";
import React from "react";
import classNames from "classnames";

import { CellContentTypes } from "model/Level";
import IconToken from "./IconToken";

export const FuelComponent : React.FC = () => (
  <IconToken content={{
    type: CellContentTypes.Fuel
  }} />
);

export const FuelPreviewComponent : React.FC<MaterialComponentProps> = ({className}) =>
  <div className={className}>
    <FuelComponent />
  </div>;

export const PrintFuelComponent : React.FC<PrintComponentProps> =
  ({className, buildOptionType, count}) =>
  <div className={classNames(className, buildOptionClasses(buildOptionType))}>
    {[...Array(count)].map((_, i) => (
      <FuelComponent key={i} />
    ))}
  </div>;
