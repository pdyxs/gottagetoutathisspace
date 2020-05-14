import GasGiant1 from './gas_giant_1.svg';
import GasGiant2 from './gas_giant_2.svg';
import RockyPlanet1 from './planet_rocky_1.svg';
import RockyPlanet2 from './planet_rocky_2.svg';

import StarBlueGiant from './star_blue_giant.svg';
import StarRed from './star_red.svg';
import StarYellow from './star_yellow.svg';

import { GameCellContent, CellContentTypes, PlanetTypes, StarTypes } from 'model/Level';

export default function GetImageURL(content: GameCellContent) : string | undefined {
  switch (content.type) {
    case CellContentTypes.Planet:
      switch (content.subtype) {
        case PlanetTypes.GasGiant:
          return content.variety === 2 ? GasGiant2 : GasGiant1;
        case PlanetTypes.Rocky:
          return content.variety === 2 ? RockyPlanet2 : RockyPlanet1;
      }
      break;

    case CellContentTypes.Star:
      switch (content.subtype) {
        case StarTypes.BlueGiant:
          return StarBlueGiant;
        case StarTypes.Yellow:
          return StarYellow;
        case StarTypes.RedDwarf:
          return StarRed;
      }
  }
  return;
}
