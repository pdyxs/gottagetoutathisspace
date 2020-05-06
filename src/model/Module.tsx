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
  damage: ShipModuleDamage[]
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
  detail?: string
}

export default ShipModule;
