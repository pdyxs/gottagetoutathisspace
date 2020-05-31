import { MaterialComponentProps, buildOptionClasses, BuildOptionTypeDetails } from "model/Materials";
import { CellContentTypes, PlanetTypes } from "model/Level";
import SpaceCard from "../GameElements/SpaceCard";
import React, { Fragment } from "react";
import space from 'data/space';
import classNames from "classnames";

export const SpaceCardPreviewComponent : React.FC<MaterialComponentProps> = ({className}) =>
  <SpaceCard type={CellContentTypes.Planet} subtype={PlanetTypes.GasGiant} variety={1}
    className={className} />;

export const PrintSpaceCardsComponent : React.FC<MaterialComponentProps> =
  ({className, buildOptionType}) =>
  <div className={classNames(className, buildOptionClasses(buildOptionType))}>
    {space.map((tile, i) => (
      <Fragment key={i}>
        {[...Array(tile.count)].map((_x, j) => (
          <SpaceCard type={tile.type} className="default-square"
            key={j}
            isPrinterFriendly={BuildOptionTypeDetails[buildOptionType].isFriendly}
            subtype={tile.subtype} variety={tile.variety}>
          </SpaceCard>
        ))}
      </Fragment>
    ))}
  </div>;
