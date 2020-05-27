import classNames from "classnames";

export enum MaterialBuildOptionType {
  None = "None",
  Buy = "Buy",
  PrintNormal = "PrintNormal",
  PrintFriendly = "PrintFriendly",
  PrintTemplate = "PrintTemplate",
  Build = "Build",
  UseMyOwn = "UseMyOwn"
}

export interface MaterialBuildOptionTypeDetail {
  isPrinted: boolean,
  isFriendly?: boolean,
  hasDetails?: boolean,
  needsBuildInstructions?: boolean
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
    isPrinted: false,
    needsBuildInstructions: true
  },

  [MaterialBuildOptionType.UseMyOwn]: {
    isPrinted: false
  }
}

export interface MaterialComponentProps {
  material: Material,
  buildOptionType: MaterialBuildOptionType,
  className?: string
}

export interface PrintComponentProps extends MaterialComponentProps {
  count?: number
}

export interface MaterialBuildOption {
  type: MaterialBuildOptionType,
  description: string,
  preview?: string | React.FC<MaterialComponentProps>
}

export function buildOptionClasses(type:MaterialBuildOptionType) {
  return classNames(
    `material-build-${type}`, {
    'printable': BuildOptionTypeDetails[type].isPrinted,
    'no-print': !BuildOptionTypeDetails[type].isPrinted,
    'printer-friendly': BuildOptionTypeDetails[type].isFriendly,
    'show-detail': BuildOptionTypeDetails[type].hasDetails
  });
}

interface Material {
  count: number | string,
  printCountMin: number,
  printCountMax: number,
  extraComponentDescription?: string,
  name: string,
  description: string,
  buildDescription?: string,
  buildOptions: MaterialBuildOption[],
  printComponent?: React.FC<PrintComponentProps>,
  hideFromLog?: boolean
};

export default Material;
