import { MaterialComponentProps, buildOptionClasses } from "model/Materials";
import CrewCard from "../GameElements/CrewCard";
import React from "react";
import crew from "data/crew";
import slugify from "slugify";
import classNames from "classnames";

export const CrewCardPreviewComponent : React.FC<MaterialComponentProps> = ({className}) =>
  <CrewCard crew={crew[0]} className={className} />;

export const PrintCrewCardsComponent : React.FC<MaterialComponentProps> =
  ({className, buildOptionType}) =>
  <div className={classNames(className, buildOptionClasses(buildOptionType))}>
    {crew.map(crew => (
      <CrewCard key={slugify(crew.name)} className="default-square"
        crew={crew}>
      </CrewCard>
    ))}
  </div>;
