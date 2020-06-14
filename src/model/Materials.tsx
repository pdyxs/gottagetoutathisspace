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

export enum MaterialType {
  Paper = "Paper",
  Card = "Card",
  Token = "Token"
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

export interface MaterialPreset {
  id: string,
  name: string,
  preset: {[id: string]: MaterialBuildOptionType}
}

export const MaterialPresets : MaterialPreset[] = [
  {
    id: 'buy-deluxe',
    name: 'Buy the Deluxe Edition (Australia Only)',
    preset: {
      [MaterialType.Paper]: MaterialBuildOptionType.Buy,
      [MaterialType.Card]: MaterialBuildOptionType.Buy,
      [MaterialType.Token]: MaterialBuildOptionType.Buy
    }
  },
  {
    id: 'buy-cards',
    name: 'Buy the Cards',
    preset: {
      [MaterialType.Card]: MaterialBuildOptionType.Buy
    }
  },
  {
    id: 'print-everything-paper',
    name: 'Print Everything',
    preset: {
      [MaterialType.Paper]: MaterialBuildOptionType.PrintNormal,
      [MaterialType.Card]: MaterialBuildOptionType.PrintNormal,
      [MaterialType.Token]: MaterialBuildOptionType.PrintNormal
    }
  },
  {
    id: 'print-everything-friendly',
    name: 'Print Everything (Printer Friendly)',
    preset: {
      [MaterialType.Paper]: MaterialBuildOptionType.PrintFriendly,
      [MaterialType.Card]: MaterialBuildOptionType.PrintFriendly,
      [MaterialType.Token]: MaterialBuildOptionType.PrintFriendly
    }
  },
  {
    id: 'print-tokens',
    name: 'Use my own Tokens',
    preset: {
      [MaterialType.Token]: MaterialBuildOptionType.UseMyOwn
    }
  },
  {
    id: 'make-all',
    name: 'Make Everything',
    preset: {
      [MaterialType.Paper]: MaterialBuildOptionType.Build,
      [MaterialType.Card]: MaterialBuildOptionType.Build,
      [MaterialType.Token]: MaterialBuildOptionType.UseMyOwn
    }
  }
]

interface Material {
  count: number | string,
  type: MaterialType,
  printCountMin: number,
  printCountDefault?: number,
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
