import Material, { MaterialBuildOptionType, MaterialType } from "model/Materials";
import { SpaceCardPreviewComponent, PrintSpaceCardsComponent } from "components/Game/Printing/Space";
import { ShipCardPreviewComponent, PrintShipCardsComponent } from "components/Game/Printing/Ship";
import { CrewCardPreviewComponent, PrintCrewCardsComponent } from "components/Game/Printing/Crew";
import { RobotPreviewComponent, PrintRobotsComponent } from "components/Game/Printing/Robot";
import { ShipTokenPreviewComponent, PrintShipTokenComponent } from "components/Game/Printing/ShipToken";
import { PrintSurvivorTokenComponent, SurvivorTokenPreviewComponent } from "components/Game/Printing/SurvivorToken";
import { UpgradeTokenPreviewComponent, PrintUpgradeTokenComponent } from "components/Game/Printing/UpgradeToken";
import { ModuleTokenPreviewComponent, PrintModuleTokenComponent } from "components/Game/Printing/ModuleToken";
import { FuelPreviewComponent, PrintFuelComponent } from "components/Game/Printing/Fuel";
import { CoverSheetPreviewComponent, PrintCoverSheetComponent } from "components/Game/Printing/CoverSheet";

import HandmadeSpace from 'content/Handmade/space.jpg';
import HandmadeShipCards from 'content/Handmade/shipCards.jpg';
import HandmadeCrew from 'content/Handmade/crew.jpg';

import HandmadeFuel from 'content/Handmade/fuel.jpg';
import HandmadeModule from 'content/Handmade/module.jpg';
import HandmadeRobot from 'content/Handmade/robot.jpg';
import HandmadeShip from 'content/Handmade/ship.jpg';
import HandmadeSurvivors from 'content/Handmade/survivors.jpg';
import HandmadeUpgrade from 'content/Handmade/upgrade.jpg';
import { CaptainsLogPreviewComponent, PrintCaptainsLogComponent } from "components/Game/Printing/CaptainsLog";
import { PrintShipsManifestComponent, ShipsManifestPreviewComponent } from "components/Game/Printing/ShipsManifest";

const materials: Material[] = [
  {
    count: 1,
    printCountMin: 1,
    printCountMax: 1,
    name: "Cover Sheet",
    type: MaterialType.Paper,
    description: "Introduces the game, and gives you a Ship Code",
    buildOptions: [
      {
        type: MaterialBuildOptionType.PrintNormal,
        description: "I want to print it",
        preview: CoverSheetPreviewComponent
      },
      {
        type: MaterialBuildOptionType.PrintFriendly,
        description: "I want to print it, but be friendly to my printer",
        preview: CoverSheetPreviewComponent
      },
      {
        type: MaterialBuildOptionType.Buy,
        description: "I want to buy a nice copy (Australia only)",
        preview: CoverSheetPreviewComponent
      },
      {
        type: MaterialBuildOptionType.Build,
        description: "I want to make it myself"
      }
    ],
    printComponent: PrintCoverSheetComponent,
    hideFromLog: true
  },
  {
    count: 1,
    printCountMin: 1,
    printCountMax: 1,
    type: MaterialType.Paper,
    name: "Captain's Log",
    description: "A log of the ship, and the components used for the game",
    buildOptions: [
      {
        type: MaterialBuildOptionType.PrintNormal,
        description: "I want to print it",
        preview: CaptainsLogPreviewComponent
      },
      {
        type: MaterialBuildOptionType.PrintFriendly,
        description: "I want to print it, but be friendly to my printer",
        preview: CaptainsLogPreviewComponent
      },
      {
        type: MaterialBuildOptionType.Buy,
        description: "I want to buy a nice copy (Australia only)",
        preview: CaptainsLogPreviewComponent
      },
      {
        type: MaterialBuildOptionType.Build,
        description: "I want to make it myself"
      }
    ],
    printComponent: PrintCaptainsLogComponent,
    hideFromLog: true
  },
  {
    count: 1,
    type: MaterialType.Paper,
    printCountMin: 1,
    printCountMax: 1,
    name: "Ship's Manifest",
    description: "A log of the ship's crew, and the components used in the game",
    buildOptions: [
      {
        type: MaterialBuildOptionType.PrintNormal,
        description: "I want to print it",
        preview: ShipsManifestPreviewComponent
      },
      {
        type: MaterialBuildOptionType.PrintFriendly,
        description: "I want to print it, but be friendly to my printer",
        preview: ShipsManifestPreviewComponent
      },
      {
        type: MaterialBuildOptionType.Buy,
        description: "I want to buy a nice copy (Australia only)",
        preview: ShipsManifestPreviewComponent
      },
      {
        type: MaterialBuildOptionType.Build,
        description: "I want to make it myself"
      }
    ],
    printComponent: PrintShipsManifestComponent,
    hideFromLog: true
  },
  {
    count: 16,
    type: MaterialType.Card,
    printCountMin: 16,
    printCountDefault: 16,
    printCountMax: 32,
    extraComponentDescription: "Extra cards are for the backs (used to denote empty space)",
    name: "Space Cards",
    description: "These are used to make the map that you'll play on",
    buildOptions: [
      {
        type: MaterialBuildOptionType.Buy,
        description: "I want to buy a nice deck",
        preview: SpaceCardPreviewComponent
      },
      {
        type: MaterialBuildOptionType.PrintNormal,
        description: "I want to print them",
        preview: SpaceCardPreviewComponent
      },
      {
        type: MaterialBuildOptionType.PrintFriendly,
        description: "I want to print them, but be friendly to my printer",
        preview: SpaceCardPreviewComponent
      },
      {
        type: MaterialBuildOptionType.PrintTemplate,
        description: "I want to print the words but draw the space things myself",
        preview: SpaceCardPreviewComponent
      },
      {
        type: MaterialBuildOptionType.Build,
        description: "I want to make them myself",
        preview: HandmadeSpace
      }
    ],
    printComponent: PrintSpaceCardsComponent
  },
  {
    count: "5-10",
    type: MaterialType.Card,
    printCountMin: 5,
    printCountDefault: 5,
    printCountMax: 18,
    extraComponentDescription: "Cards after the first 5 are blanks",
    name: "Ship Module Cards",
    description: "These modules come together to make your ship. Each affects what you can do or what your ship can contain in some way.",
    buildOptions: [
      {
        type: MaterialBuildOptionType.Buy,
        description: "I want to buy a nice deck",
        preview: ShipCardPreviewComponent
      },
      {
        type: MaterialBuildOptionType.PrintNormal,
        description: "I want to print them",
        preview: ShipCardPreviewComponent
      },
      {
        type: MaterialBuildOptionType.PrintFriendly,
        description: "I want to print them, but be friendly to my printer",
        preview: ShipCardPreviewComponent
      },
      {
        type: MaterialBuildOptionType.PrintTemplate,
        description: "I want to print the words but draw the modules myself",
        preview: ShipCardPreviewComponent
      },
      {
        type: MaterialBuildOptionType.Build,
        description: "I want to make them myself",
        preview: HandmadeShipCards
      }
    ],
    printComponent: PrintShipCardsComponent
  },
  {
    count: "1 or more",
    type: MaterialType.Card,
    printCountMin: 1,
    printCountDefault: 8,
    printCountMax: 14,
    extraComponentDescription: "Extra cards are for crew members you'll pick up along the way",
    name: "Crew Cards",
    description: "Your crew. Each comes with an ability that can be used once per game",
    buildDescription: "",
    buildOptions: [
      {
        type: MaterialBuildOptionType.Buy,
        description: "I want to buy a nice deck",
        preview: CrewCardPreviewComponent
      },
      {
        type: MaterialBuildOptionType.PrintNormal,
        description: "I want to print them",
        preview: CrewCardPreviewComponent
      },
      {
        type: MaterialBuildOptionType.PrintFriendly,
        description: "I want to print them, but be friendly to my printer",
        preview: CrewCardPreviewComponent
      },
      {
        type: MaterialBuildOptionType.Build,
        description: "I want to make them myself",
        preview: HandmadeCrew
      }
    ],
    printComponent: PrintCrewCardsComponent
  },
  {
    count: 20,
    type: MaterialType.Token,
    printCountMin: 20,
    printCountMax: 20,
    name: "Robot Tokens",
    description: "The robots that are coming to destroy you",
    buildDescription: "",
    buildOptions: [
      {
        type: MaterialBuildOptionType.UseMyOwn,
        description: "I want to use my own tokens",
        preview: HandmadeRobot
      },
      {
        type: MaterialBuildOptionType.PrintNormal,
        description: "I want to print them",
        preview: RobotPreviewComponent
      },
      {
        type: MaterialBuildOptionType.PrintFriendly,
        description: "I want to print them, but be friendly to my printer",
        preview: RobotPreviewComponent
      },
      {
        type: MaterialBuildOptionType.Buy,
        description: "Buy the deluxe edition (Australia only)"
      }
    ],
    printComponent: PrintRobotsComponent
  },
  {
    count: 1,
    type: MaterialType.Token,
    printCountMin: 1,
    printCountMax: 1,
    name: "Ship Token",
    description: "The representation of the ship on the map",
    buildDescription: "",
    buildOptions: [
      {
        type: MaterialBuildOptionType.UseMyOwn,
        description: "I want to use my own token",
        preview: HandmadeShip
      },
      {
        type: MaterialBuildOptionType.PrintNormal,
        description: "I want to print it",
        preview: ShipTokenPreviewComponent
      },
      {
        type: MaterialBuildOptionType.PrintFriendly,
        description: "I want to print it, but be friendly to my printer",
        preview: ShipTokenPreviewComponent
      },
      {
        type: MaterialBuildOptionType.Buy,
        description: "Buy the deluxe edition (Australia only)"
      }
    ],
    printComponent: PrintShipTokenComponent
  },
  {
    count: "1-4",
    type: MaterialType.Token,
    printCountMin: 1,
    printCountMax: 4,
    extraComponentDescription: "You'll need one of these per player. If you don't provide enough, whoever gets the game will have to add their own",
    name: "Survivor Tokens",
    description: "Represents you!",
    buildDescription: "",
    buildOptions: [
      {
        type: MaterialBuildOptionType.UseMyOwn,
        description: "I want to use my own tokens",
        preview: HandmadeSurvivors
      },
      {
        type: MaterialBuildOptionType.PrintNormal,
        description: "I want to print them",
        preview: SurvivorTokenPreviewComponent
      },
      {
        type: MaterialBuildOptionType.PrintFriendly,
        description: "I want to print them, but be friendly to my printer",
        preview: SurvivorTokenPreviewComponent
      },
      {
        type: MaterialBuildOptionType.Buy,
        description: "Buy the deluxe edition (Australia only)"
      }
    ],
    printComponent: PrintSurvivorTokenComponent
  },
  {
    count: 1,
    type: MaterialType.Token,
    printCountMin: 1,
    printCountMax: 1,
    name: "Upgrade Token",
    description: "An upgrade for one of your ship's modules that you might be able to collect",
    buildDescription: "",
    buildOptions: [
      {
        type: MaterialBuildOptionType.UseMyOwn,
        description: "I want to use my own token",
        preview: HandmadeUpgrade
      },
      {
        type: MaterialBuildOptionType.PrintNormal,
        description: "I want to print it",
        preview: UpgradeTokenPreviewComponent
      },
      {
        type: MaterialBuildOptionType.PrintFriendly,
        description: "I want to print it, but be friendly to my printer",
        preview: UpgradeTokenPreviewComponent
      },
      {
        type: MaterialBuildOptionType.Buy,
        description: "Buy the deluxe edition (Australia only)"
      }
    ],
    printComponent: PrintUpgradeTokenComponent
  },
  {
    count: 1,
    type: MaterialType.Token,
    printCountMin: 1,
    printCountMax: 1,
    name: "New Module Token",
    description: "A new module you might be able to pick up",
    buildDescription: "",
    buildOptions: [
      {
        type: MaterialBuildOptionType.UseMyOwn,
        description: "I want to use my own token",
        preview: HandmadeModule
      },
      {
        type: MaterialBuildOptionType.PrintNormal,
        description: "I want to print it",
        preview: ModuleTokenPreviewComponent
      },
      {
        type: MaterialBuildOptionType.PrintFriendly,
        description: "I want to print it, but be friendly to my printer",
        preview: ModuleTokenPreviewComponent
      },
      {
        type: MaterialBuildOptionType.Buy,
        description: "Buy the deluxe edition (Australia only)"
      }
    ],
    printComponent: PrintModuleTokenComponent
  },
  {
    count: 8,
    type: MaterialType.Token,
    printCountMin: 8,
    printCountMax: 8,
    name: "Fuel Tokens",
    description: "Fuel that you have, or can collect.",
    buildDescription: "",
    buildOptions: [
      {
        type: MaterialBuildOptionType.UseMyOwn,
        description: "I want to use my own tokens",
        preview: HandmadeFuel
      },
      {
        type: MaterialBuildOptionType.PrintNormal,
        description: "I want to print it",
        preview: FuelPreviewComponent
      },
      {
        type: MaterialBuildOptionType.PrintFriendly,
        description: "I want to print it, but be friendly to my printer",
        preview: FuelPreviewComponent
      },
      {
        type: MaterialBuildOptionType.Buy,
        description: "Buy the deluxe edition (Australia only)"
      }
    ],
    printComponent: PrintFuelComponent
  }
];

export default materials;
