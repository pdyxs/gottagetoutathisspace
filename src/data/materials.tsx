import { ShipData } from "../redux/actions";
import Material from "model/Materials";

const materials: Material[] = [
  {
    count: 16,
    name: "Space Cards",
    explanation: "These are used to make the map that you'll play on",
    notes: (d : ShipData) => d.spaceCards
  },
  {
    count: "5-10",
    name: "Ship Module Cards",
    explanation: "These modules come together to make your ship. Each affects what you can do or what your ship can contain in some way.",
    notes: (d : ShipData) => d.shipCards
  },
  {
    count: "1 or more",
    name: "Crew Cards",
    explanation: "Your crew. Each comes with an ability that can be used once per game",
    notes: (d : ShipData) => d.crewCards
  },

  {
    count: 20,
    name: "Robot Tokens",
    explanation: "The robots that are coming to destroy you",
    notes: (d : ShipData) => d.robotTokens
  },
  {
    count: 1,
    name: "Ship Token",
    explanation: "The representation of the ship on the map",
    notes: (d : ShipData) => d.shipToken
  },
  {
    count: 1,
    name: "Survivor Token",
    explanation: "Represents you!",
    notes: (d : ShipData) => d.survivorToken
  },
  {
    count: 1,
    name: "Upgrade Token",
    explanation: "An upgrade for one of your ship's modules that you might be able to collect",
    notes: (d : ShipData) => d.upgradeToken
  },
  {
    count: 1,
    name: "New Module Token",
    explanation: "A new module you might be able to pick up",
    notes: (d : ShipData) => d.newModuleToken
  },
  {
    count: "Some",
    name: "Fuel Tokens",
    explanation: "Fuel that you have, or can collect.",
    notes: (d : ShipData) => d.fuelTokens
  }
];

export default materials;
