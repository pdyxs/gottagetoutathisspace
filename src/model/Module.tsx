import { IconPrefix, IconName } from "@fortawesome/fontawesome-svg-core";

export enum ShipModuleType {
  Basic = 'basic',
  Advanced = 'advanced'
}

interface ShipModule {
  name: string,
  type: ShipModuleType,
  basicEffects: string[],
  upgrades: ShipModuleUpgrade[],
  damageSlots: number,
  damage: ShipModuleDamage[],
  imageURL?: string,
  targetImageURL?: string
}

export interface ShipModuleUpgrade {
  name: string,
  effect: string,
  detail?: string
}

export interface ShipModuleDamage {
  name: string,
  compulsory?: boolean,
  effect: string,
  icon?: [IconPrefix, IconName],
  detail?: string
}

export default ShipModule;
