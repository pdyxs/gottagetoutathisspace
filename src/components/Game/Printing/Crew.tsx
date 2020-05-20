import { MaterialComponentProps, buildOptionClasses, PrintComponentProps } from "model/Materials";
import CrewCard from "../GameElements/CrewCard";
import React from "react";
import classNames from "classnames";

export const CrewCardPreviewComponent : React.FC<MaterialComponentProps> = ({className}) =>
  <CrewCard className={className} />;

export const PrintCrewCardsComponent : React.FC<PrintComponentProps> =
  ({className, buildOptionType, count}) =>
  <div className={classNames(className, buildOptionClasses(buildOptionType))}>
    {[...Array(count)].map((_, i) => (
      <CrewCard key={i} className="default-square">
      </CrewCard>
    ))}
  </div>;
