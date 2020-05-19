import { CellContentTypes, PlanetTypes, StarTypes } from "./Level";

interface Space {
  type?: CellContentTypes;
  subtype?: PlanetTypes | StarTypes;
  count: number;
  variety?: number;
}

export default Space;
