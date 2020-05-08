import Crew from "model/Crew";

const crew: Crew[] = [
  {
    name: 'Pilot',
    power: 'Take 1 extra action'
  },
  {
    name: 'Gunner',
    power: 'When using the gun, kill 2 robots in the same square for 1 action'
  },
  {
    name: 'Engineer',
    power: 'Repair 1 damage'
  },
  {
    name: 'Miner',
    power: 'Take 1 extra fuel from a planet'
  },
  {
    name: 'Hacker',
    power: 'Stop the robots from acting in 1 square'
  },
  {
    name: 'Captain',
    power: 'Rest another crew member'
  }
];

export default crew;
