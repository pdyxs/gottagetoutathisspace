import { ShipData } from "../redux/actions";
import Material, { MaterialBuildOptionType } from "model/Materials";
import SpaceCard from "components/Game/GameElements/SpaceCard";
import React from "react";
import { CellContentTypes, PlanetTypes } from "model/Level";

const materials: Material[] = [
  {
    count: 16,
    name: "Space Cards",
    description: "These are used to make the map that you'll play on",
    notes: (d : ShipData) => d.spaceCards,
    buildOptions: [
      {
        type: MaterialBuildOptionType.Buy,
        description: "I want to buy a nice deck",
        preview: ({className}) =>
          <SpaceCard type={CellContentTypes.Planet} subtype={PlanetTypes.GasGiant}
            className={className} />
      },
      {
        type: MaterialBuildOptionType.PrintNormal,
        description: "I want to print them",
        preview: ({className}) =>
          <SpaceCard type={CellContentTypes.Planet} subtype={PlanetTypes.GasGiant}
            className={className} />
      },
      {
        type: MaterialBuildOptionType.PrintFriendly,
        description: "I want to print them, but be friendly to my printer",
        preview: ({className}) =>
          <SpaceCard type={CellContentTypes.Planet} subtype={PlanetTypes.GasGiant}
            className={className} />
      },
      {
        type: MaterialBuildOptionType.PrintTemplate,
        description: "I want to print the words but draw the space things myself",
        preview: ({className}) =>
          <SpaceCard type={CellContentTypes.Planet} subtype={PlanetTypes.GasGiant}
            className={className} />
      },
      {
        type: MaterialBuildOptionType.Build,
        description: "I want to make them myself"
      }
    ]
  },
  {
    count: "5-10",
    name: "Ship Module Cards",
    description: "These modules come together to make your ship. Each affects what you can do or what your ship can contain in some way.",
    buildDescription: "The full deck includes 10 blank ship module cards that you and your friends can use to expand the ship",
    notes: (d : ShipData) => d.shipCards,
    buildOptions: []
  },
  {
    count: "1 or more",
    name: "Crew Cards",
    description: "Your crew. Each comes with an ability that can be used once per game",
    buildDescription: "",
    notes: (d : ShipData) => d.crewCards,
    buildOptions: []
  },
  {
    count: 20,
    name: "Robot Tokens",
    description: "The robots that are coming to destroy you",
    buildDescription: "",
    notes: (d : ShipData) => d.robotTokens,
    buildOptions: []
  },
  {
    count: 1,
    name: "Ship Token",
    description: "The representation of the ship on the map",
    buildDescription: "",
    notes: (d : ShipData) => d.shipToken,
    buildOptions: []
  },
  {
    count: 1,
    name: "Survivor Token",
    description: "Represents you!",
    buildDescription: "",
    notes: (d : ShipData) => d.survivorToken,
    buildOptions: []
  },
  {
    count: 1,
    name: "Upgrade Token",
    description: "An upgrade for one of your ship's modules that you might be able to collect",
    buildDescription: "",
    notes: (d : ShipData) => d.upgradeToken,
    buildOptions: []
  },
  {
    count: 1,
    name: "New Module Token",
    description: "A new module you might be able to pick up",
    buildDescription: "",
    notes: (d : ShipData) => d.newModuleToken,
    buildOptions: []
  },
  {
    count: "Some",
    name: "Fuel Tokens",
    description: "Fuel that you have, or can collect.",
    buildDescription: "",
    notes: (d : ShipData) => d.fuelTokens,
    buildOptions: []
  }
];

export default materials;
