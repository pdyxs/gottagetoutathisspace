import ShipModule, { ShipModuleType } from "model/Module";

const modules: ShipModule[] = [
  {
    name: 'Cockpit',
    type: ShipModuleType.Basic,
    basicEffects: [
      'Do 1 action per turn without using fuel',
      'Action: If you are at a star, leave this solar system'
    ],
    upgrades: [
      {
        name: 'Advanced Navigation',
        effect: 'You can leave the solar system without using an Action'
      },
      {
        name: 'Improved Resilience',
        effect: 'Add 1 more damage square to this module'
      }
    ],
    damageSlots: 3,
    damage: [
      {
        name: 'System Shutdown',
        effect: 'Spend your next free action repairing this',
        detail: 'To effect repairs, colour in the damage square'
      }
    ]
  },
  {
    name: 'Crew Quarters',
    type: ShipModuleType.Basic,
    basicEffects: [
      'Hold up to 3 Crew Members'
    ],
    upgrades: [
      {
        name: 'Rejuvination Suite',
        effect: 'For 2 Actions, rest a Crew Member',
        detail: 'This Allows you to use their ability again'
      },
      {
        name: 'Improved Resilience',
        effect: 'Add 1 more damage square to this module'
      }
    ],
    damageSlots: 3,
    damage: [
      {
        name: 'Loss of Atmosphere',
        effect: 'Lose 1 crew capacity',
        detail: 'If you now have less crew capacity than crew, one of your crew dies'
      },
      {
        name: 'Trapped Crew',
        effect: 'Exhaust one crew member immediately',
        detail: 'If all of your crew are already exhausted, one of your crew dies'
      }
    ]
  },
  {
    name: 'Cargo Bay',
    type: ShipModuleType.Basic,
    basicEffects: [
      'Hold up to 3 fuel',
      'Spend 1 fuel to do 1 Action',
      'Action: Pick up 1 Crew, Upgrade or Module from a planet'
    ],
    upgrades: [
      {
        name: 'Extra Storage',
        effect: 'Add capacity for 2 more fuel'
      },
      {
        name: 'Improved Pickup',
        effect: 'Pick up 2 things from a planet for 1 action'
      },
      {
        name: 'Improved Resilience',
        effect: 'Add 1 more damage square to this module'
      }
    ],
    damageSlots: 3,
    damage: [
      {
        name: 'Broken Drum',
        effect: 'Lose 1 fuel capacity',
        detail: 'If you now have less capacity than fuel, lose 1 fuel'
      },
      {
        name: 'Broken Pipe',
        effect: 'You may only use 1 fuel from this Cargo Bay per turn'
      }
    ]
  },
  {
    name: 'Thruster',
    type: ShipModuleType.Basic,
    basicEffects: [
      'Move to one of these squares'
    ],
    upgrades: [
      {
        name: 'Extra Maneuverability',
        effect: 'Colour in another square - you can now move there'
      },
      {
        name: 'Improved Resilience',
        effect: 'Add 1 more damage square to this module'
      }
    ],
    damageSlots: 3,
    damage: [
      {
        name: 'Loss of Maneuverability',
        effect: 'Put an "X" through a square - you can no longer move there'
      },
      {
        name: 'Thruster Failed',
        effect: 'Spend an Action to repair this before you can move again',
        detail: 'To effect repairs, colour in the damage square'
      }
    ]
  },
  {
    name: 'Gun',
    type: ShipModuleType.Basic,
    basicEffects: [
      'Kill a robot in one of these squares'
    ],
    upgrades: [
      {
        name: 'Improved Aim',
        effect: 'Colour in another square - you can now shoot there'
      },
      {
        name: 'Improved Resilience',
        effect: 'Add 1 more damage square to this module'
      }
    ],
    damageSlots: 3,
    damage: [
      {
        name: 'Reduced Aim',
        effect: 'Put an "X" through a square - you can no longer shoot there'
      },
      {
        name: 'Weapons Failure',
        effect: 'Spend an Action to repair this before you can shoot again',
        detail: 'To effect repairs, colour in the damage square'
      }
    ]
  },
  {
    name: 'Armour Plating',
    type: ShipModuleType.Advanced,
    basicEffects: [
      'You can always damage this system instead of something else'
    ],
    upgrades: [
      {
        name: 'Extra Plates',
        effect: 'Add 2 more damage squares to this module'
      }
    ],
    damageSlots: 2,
    damage: [
      {
        compulsory: true,
        name: 'Take Damage',
        effect: 'No effect'
      }
    ]
  },
  {
    name: 'Close Quarters Weapon',
    type: ShipModuleType.Advanced,
    basicEffects: [
      'Action: Destroy 3 Robots in your square'
    ],
    upgrades: [
      {
        name: 'Extra targets',
        effect: 'Destroy 1 extra robot when you use this module'
      }
    ],
    damageSlots: 2,
    damage: [
      {
        name: 'Collateral Damage',
        effect: 'When you use this module, take 1 damage'
      },
      {
        name: 'Weapons Failure',
        effect: 'Spend an Action to repair this before you use it again',
        detail: 'To effect repairs, colour in the damage square'
      }
    ]
  },
  {
    name: 'Damage Control',
    type: ShipModuleType.Advanced,
    basicEffects: [
      'Action: Repair one Damage Square on any module (by colouring it in). This must be the only action you take this turn.'
    ],
    upgrades: [
      {
        name: 'Partial Shut-down',
        effect: 'You may take other Actions when you repair'
      }
    ],
    damageSlots: 2,
    damage: [
      {
        name: 'Loss of Spare Parts',
        effect: 'When you repair a module, you must colour in one blank damage square on any module'
      }
    ]
  }
]

export default modules;
