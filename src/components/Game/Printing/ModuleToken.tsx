import { MaterialComponentProps, buildOptionClasses, PrintComponentProps } from "model/Materials";
import React from "react";
import classNames from "classnames";

import { CellContentTypes } from "model/Level";
import IconToken from "./IconToken";

export const ModuleComponent : React.FC = () => (
  <IconToken content={{
    type: CellContentTypes.Module
  }} />
);

export const ModuleTokenPreviewComponent : React.FC<MaterialComponentProps> = ({className}) =>
  <div className={className}>
    <ModuleComponent />
  </div>;

export const PrintModuleTokenComponent : React.FC<PrintComponentProps> =
  ({className, buildOptionType}) =>
  <div className={classNames(className, buildOptionClasses(buildOptionType))}>
    <ModuleComponent />
  </div>;
