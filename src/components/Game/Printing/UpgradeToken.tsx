import { MaterialComponentProps, buildOptionClasses, PrintComponentProps } from "model/Materials";
import React from "react";
import classNames from "classnames";

import { CellContentTypes } from "model/Level";
import IconToken from "./IconToken";

export const UpgradeComponent : React.FC = () => (
  <IconToken content={{
    type: CellContentTypes.Upgrade
  }} />
);

export const UpgradeTokenPreviewComponent : React.FC<MaterialComponentProps> = ({className}) =>
  <div className={className}>
    <UpgradeComponent />
  </div>;

export const PrintUpgradeTokenComponent : React.FC<PrintComponentProps> =
  ({className, buildOptionType}) =>
  <div className={classNames(className, buildOptionClasses(buildOptionType))}>
    <UpgradeComponent />
  </div>;
