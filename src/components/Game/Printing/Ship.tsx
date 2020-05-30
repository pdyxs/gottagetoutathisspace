import { MaterialComponentProps, buildOptionClasses, PrintComponentProps } from "model/Materials";
import modules from "data/modules";
import ShipCard from "../GameElements/ShipCard";
import React from "react";
import classNames from "classnames";
import slugify from "slugify";
import { filter, max } from "lodash";
import { ShipModuleType } from "model/Module";

export const ShipCardPreviewComponent : React.FC<MaterialComponentProps> = ({className}) =>
  <ShipCard module={modules[0]} className={className} />;

export const PrintShipCardsComponent : React.FC<PrintComponentProps> =
  ({className, buildOptionType, count}) =>
{
  const basicModules = filter(modules, m=>m.type === ShipModuleType.Basic);
  const extrasLength = max([0, (count || 0) - basicModules.length]) || 0;
  return (
    <div className={classNames(className, buildOptionClasses(buildOptionType))}>
      {basicModules.map(m => (
        <ShipCard key={slugify(m.name)} className="default-square"
          module={m}>
        </ShipCard>
      ))}
      {[...Array(extrasLength)].map((_, i) => (
        <ShipCard key={i} className="default-square">
        </ShipCard>
      ))}
    </div>
  );
};
