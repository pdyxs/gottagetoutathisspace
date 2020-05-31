import ShipModule, { ShipModuleType } from "model/Module";
import CockpitImage from 'content/Pieces/cockpit.svg';
import CrewQuartersImage from 'content/Pieces/crew_quarters.svg';
import GunImage from 'content/Pieces/gun.svg';
import GunSquaresImage from 'content/Pieces/shoot_squares.svg';
import CargoBayImage from 'content/Pieces/storage_bay.svg';
import ThrusterImage from 'content/Pieces/thruster.svg';
import ThrusterSquaresImage from 'content/Pieces/move_squares.svg';

const modules: ShipModule[] = [
  {
    name: 'Cockpit',
    type: ShipModuleType.Basic,
    basicEffects: [
      "Action: Install an upgrade on this square",
      "Action: Install a new module on this square",
      "Action: When at a star, leave the solar system"
    ],
    upgrades: [
      {
        name: 'Advanced Navigation',
        effect: 'You can leave the solar system without using an Action'
      },
      {
        name: 'Advanced Renovation',
        effect: 'You can install a module upgrade without using an Action'
      },
      {
        name: 'Advanced Construction',
        effect: 'You can install a new module without using an Action'
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
        detail: 'To effect repairs, colour in the damage square',
        icon: ['fas', 'slash']
      }
    ],
    imageURL: CockpitImage
  },
  {
    name: 'Crew Quarters',
    type: ShipModuleType.Basic,
    basicEffects: [
      'Action: Pick up a survivor on this square',
      'Holds 3 Crew Members'
    ],
    upgrades: [
      {
        name: 'Improved Grabber',
        effect: 'Once a turn, you may pick up a Survivor without using an Action'
      },
      {
        name: 'Swedish Design',
        effect: 'Add 1 crew capacity'
      },
      {
        name: 'Rejuvination Suite',
        effect: 'Action: Rest a Crew Member',
        detail: 'This Allows you to use their ability again'
      },
      {
        name: 'Improved Resilience',
        effect: 'Add 1 more damage square to this module'
      }
    ],
    damageSlots: 2,
    damage: [
      {
        name: 'Loss of Atmosphere',
        effect: 'Lose 1 crew capacity',
        detail: 'Cross out one room. If you now have less crew capacity than crew, one of your crew dies',
        icon: ['far', 'window-close']
      },
      {
        name: 'Trapped Crew',
        effect: 'One crew member starts exhausted',
        detail: 'Turn over a crew card immediately. If all of your crew are already exhausted, one of your crew dies',
        icon: ['fas', 'snooze']
      }
    ],
    imageURL: CrewQuartersImage
  },
  {
    name: 'Cargo Bay',
    type: ShipModuleType.Basic,
    basicEffects: [
      'Action: Pick up all fuel on this square',
      'Holds 3 fuel',
      'Spend 1 fuel to do 1 Action'
    ],
    upgrades: [
      {
        name: 'Extra Storage',
        effect: 'Add capacity for 2 more fuel'
      },
      {
        name: 'Improved Pump',
        effect: 'Pick up all fuel in a square when you enter it, without spending an action'
      },
      {
        name: 'Improved Resilience',
        effect: 'Add 1 more damage square to this module'
      }
    ],
    damageSlots: 2,
    damage: [
      {
        name: 'Broken Drum',
        effect: 'Lose 1 fuel capacity',
        detail: 'Cross out a capacity. If you now have less capacity than fuel, lose 1 fuel',
        icon: ['far', 'window-close']
      },
      {
        name: 'Broken Intake',
        effect: 'You may only use 1 fuel from this Cargo Bay per turn',
        icon: ['far', 'tint']
      },
      {
        name: 'Broken Pump',
        effect: 'You may only bring 1 fuel into the Cargo Bay per turn',
        icon: ['far', 'unlink']
      }
    ],
    imageURL: CargoBayImage
  },
  {
    name: 'Thruster',
    type: ShipModuleType.Basic,
    basicEffects: [
      'Action: Move to one of these movement squares'
    ],
    upgrades: [
      {
        name: 'Extra Maneuverability',
        effect: 'Colour in another movement square - you can now move there'
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
        effect: 'You can move to one less movement square',
        detail: 'Put an "X" through a movement square',
        icon: ['far', 'window-close']
      },
      {
        name: 'Thruster Failed',
        effect: 'Spend an Action to repair this before you can move again',
        detail: 'To effect repairs, colour in the damage square',
        icon: ['fas', 'slash']
      }
    ],
    imageURL: ThrusterImage,
    targetImageURL: ThrusterSquaresImage
  },
  {
    name: 'Gun',
    type: ShipModuleType.Basic,
    basicEffects: [
      'Action: Kill a robot in one of these target squares'
    ],
    upgrades: [
      {
        name: 'Improved Aim',
        effect: 'Circle in a target square - you can now shoot there'
      },
      {
        name: 'Improved Resilience',
        effect: 'Add 1 more damage square to this module'
      }
    ],
    damageSlots: 2,
    damage: [
      {
        name: 'Reduced Aim',
        effect: 'You can shoot at one less target square',
        detail: 'Put an "X" through a target square',
        icon: ['far', 'window-close']
      },
      {
        name: 'Weapons Failure',
        effect: 'Spend an Action to repair this before you can shoot again',
        detail: 'To effect repairs, colour in the damage square',
        icon: ['fas', 'slash']
      }
    ],
    imageURL: GunImage,
    targetImageURL: GunSquaresImage
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
    damageSlots: 1,
    damage: [
      {
        compulsory: true,
        name: 'Take Damage',
        effect: 'No effect',
        detail: "You don't have to write this on the module card",
        icon: ['fas', 'square']
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
    damageSlots: 1,
    damage: [
      {
        name: 'Collateral Damage',
        effect: 'When you use this module, take 1 damage',
        icon: ['far', 'clone']
      },
      {
        name: 'Weapons Failure',
        effect: 'Spend an Action to repair this before you use it again',
        detail: 'To effect repairs, colour in the damage square',
        icon: ['fas', 'slash']
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
    damageSlots: 1,
    damage: [
      {
        name: 'Loss of Spare Parts',
        effect: 'When you repair a module, you must damage another',
        detail: 'To do this, colour in a blank damage square on any module',
        icon: ['far', 'clone']
      }
    ]
  }
]

export default modules;
