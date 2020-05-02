import Level, { Coords, GameCellSettings, CellContentTypes, PlanetTypes } from "../../model/Level";
import { IonItem } from "@ionic/react";
import React from "react";
import './GameCellPopover.scss';
import { isNil, find } from "lodash";
import classNames from "classnames";
import { CellContentIcon, CellContentDescription, CellContentControls } from "./Pieces";

interface GameCellPopoverProps {
  coordinates: Coords,
  level: Level,
  settings: GameCellSettings,
  refresh: CallableFunction,
  includeControls: boolean
}

const GameCellPopover: React.FC<GameCellPopoverProps> = (props) => {
  const {level, coordinates, includeControls} = props;

  const cell = level.getCell(coordinates);

  var descriptiveContents = [
    ...(cell?.contents || [])
  ];

  if (isNil(find(descriptiveContents, c => c.type === CellContentTypes.Robot))) {
    descriptiveContents.push({
      type: CellContentTypes.Robot,
      count: 0
    });
  }

  var planet = find(descriptiveContents, c => c.type === CellContentTypes.Planet);
  if (planet && planet.subtype === PlanetTypes.Rocky &&
      isNil(find(descriptiveContents, c => c.type === CellContentTypes.Crew)))
  {
    descriptiveContents.push({
      type: CellContentTypes.Crew,
      count: 0
    });
  }

  return (
    <div className={classNames('popover',
      {
        'popover-first': coordinates[0] === 0,
        'popover-second': coordinates[0] === 1,
        'popover-last': coordinates[0] === level.grid[0].length - 1,
        'popover-second-last': coordinates[0] === level.grid[0].length - 2
      })}>
      {cell && (isNil(cell.contents) || cell.contents?.length === 0) &&
        <IonItem>Nothing but space</IonItem>
      }
      {descriptiveContents.map(content =>
        <IonItem key={`${content.type}-${content.subtype}`}>
          <CellContentIcon className="ion-margin-end" content={content} />
          <CellContentDescription content={content} />
          {includeControls &&
            <CellContentControls content={content} {...props} />
          }
        </IonItem>
      )}
    </div>
  );
};

export default GameCellPopover;
