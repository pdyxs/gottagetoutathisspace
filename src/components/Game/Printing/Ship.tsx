import { MaterialComponentProps, buildOptionClasses } from "model/Materials";
import modules from "data/modules";
import ShipCard from "../GameElements/ShipCard";
import React from "react";
import classNames from "classnames";
import slugify from "slugify";

export const ShipCardPreviewComponent : React.FC<MaterialComponentProps> = ({className}) =>
  <ShipCard module={modules[0]} className={className} />;

export const PrintShipCardsComponent : React.FC<MaterialComponentProps> =
  ({className, buildOptionType}) =>
  <div className={classNames(className, buildOptionClasses(buildOptionType))}>
    {modules.map(module => (
      <ShipCard key={slugify(module.name)} className="default-square"
        module={module}>
      </ShipCard>
    ))}
  </div>;
