import { ShipData } from "../redux/actions";

export enum MaterialBuildOptionType {
  Buy = "Buy",
  PrintNormal = "PrintNormal",
  PrintFriendly = "PrintFriendly",
  PrintTemplate = "PrintTemplate",
  Build = "Build"
}

export interface MaterialBuildOptionTypeDetail {
  isPrinted: boolean,
  isFriendly?: boolean,
  hasDetails?: boolean
}

export const BuildOptionTypeDetails : {[id: string]: MaterialBuildOptionTypeDetail} = {
  [MaterialBuildOptionType.Buy]: {
    isPrinted: false,
    hasDetails: true
  },

  [MaterialBuildOptionType.PrintNormal]: {
    isPrinted: true,
    hasDetails: true
  },

  [MaterialBuildOptionType.PrintFriendly]: {
    isPrinted: true,
    isFriendly: true,
    hasDetails: true
  },

  [MaterialBuildOptionType.PrintTemplate]: {
    isPrinted: true,
    isFriendly: true
  },

  [MaterialBuildOptionType.Build]: {
    isPrinted: false
  }
}

export interface MaterialComponentProps {
  material: Material,
  buildOption: MaterialBuildOption,
  className?: string
}

export interface MaterialBuildOption {
  type: MaterialBuildOptionType,
  description: string,
  preview?: string | React.FC<MaterialComponentProps>
}

interface Material {
  count: number | string,
  name: string,
  description: string,
  buildDescription?: string,
  notes: (d: ShipData) => string,
  buildOptions: MaterialBuildOption[]
};

export default Material;
