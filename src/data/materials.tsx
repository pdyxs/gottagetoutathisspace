import { ShipData } from "../redux/actions";
import Material, { MaterialBuildOptionType } from "model/Materials";
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

const materials: Material[] = [
  {
    count: 1,
    printCountMin: 1,
    printCountMax: 1,
    name: "Cover Sheet",
    description: "Introduces the game, and gives you a Ship Code",
    notes: (d : ShipData) => "",
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
        type: MaterialBuildOptionType.Build,
        description: "I want to make my own"
      }
    ],
    printComponent: PrintCoverSheetComponent
  },
  {
    count: 16,
    printCountMin: 16,
    printCountMax: 32,
    extraComponentDescription: "Extra cards are for the backs (used to denote empty space)",
    name: "Space Cards",
    description: "These are used to make the map that you'll play on",
    notes: (d : ShipData) => d.spaceCards,
    buildOptions: [
      // {
      //   type: MaterialBuildOptionType.Buy,
      //   description: "I want to buy a nice deck",
      //   preview: SpaceCardPreviewComponent
      // },
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
        description: "I want to make them myself"
      }
    ],
    printComponent: PrintSpaceCardsComponent
  },
  {
    count: "5-10",
    printCountMin: 5,
    printCountMax: 12,
    extraComponentDescription: "Cards 6-8 are advanced modules that you don't start with, 9+ are blanks",
    name: "Ship Module Cards",
    description: "These modules come together to make your ship. Each affects what you can do or what your ship can contain in some way.",
    // buildDescription: "The full deck includes 10 blank ship module cards that you and your friends can use to expand the ship",
    notes: (d : ShipData) => d.shipCards,
    buildOptions: [
      // {
      //   type: MaterialBuildOptionType.Buy,
      //   description: "I want to buy a nice deck",
      //   preview: ShipCardPreviewComponent
      // },
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
        description: "I want to make them myself"
      }
    ],
    printComponent: PrintShipCardsComponent
  },
  {
    count: "1 or more",
    printCountMin: 1,
    printCountMax: 10,
    extraComponentDescription: "Extra cards are for crew members you'll pick up along the way",
    name: "Crew Cards",
    description: "Your crew. Each comes with an ability that can be used once per game",
    buildDescription: "",
    notes: (d : ShipData) => d.crewCards,
    buildOptions: [
      // {
      //   type: MaterialBuildOptionType.Buy,
      //   description: "I want to buy a nice deck",
      //   preview: CrewCardPreviewComponent
      // },
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
        description: "I want to make them myself"
      }
    ],
    printComponent: PrintCrewCardsComponent
  },
  {
    count: 20,
    printCountMin: 20,
    printCountMax: 20,
    name: "Robot Tokens",
    description: "The robots that are coming to destroy you",
    buildDescription: "",
    notes: (d : ShipData) => d.robotTokens,
    buildOptions: [
      {
        type: MaterialBuildOptionType.Build,
        description: "I want to use my own tokens"
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
      }
    ],
    printComponent: PrintRobotsComponent
  },
  {
    count: 1,
    printCountMin: 1,
    printCountMax: 1,
    name: "Ship Token",
    description: "The representation of the ship on the map",
    buildDescription: "",
    notes: (d : ShipData) => d.shipToken,
    buildOptions: [
      {
        type: MaterialBuildOptionType.Build,
        description: "I want to use my own token"
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
      }
    ],
    printComponent: PrintShipTokenComponent
  },
  {
    count: "1-4",
    printCountMin: 1,
    printCountMax: 4,
    extraComponentDescription: "You'll need one of these per player. If you don't provide enough, whoever gets the game will have to add their own",
    name: "Survivor Tokens",
    description: "Represents you!",
    buildDescription: "",
    notes: (d : ShipData) => d.survivorToken,
    buildOptions: [
      {
        type: MaterialBuildOptionType.Build,
        description: "I want to use my own tokens"
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
      }
    ],
    printComponent: PrintSurvivorTokenComponent
  },
  {
    count: 1,
    printCountMin: 1,
    printCountMax: 1,
    name: "Upgrade Token",
    description: "An upgrade for one of your ship's modules that you might be able to collect",
    buildDescription: "",
    notes: (d : ShipData) => d.upgradeToken,
    buildOptions: [
      {
        type: MaterialBuildOptionType.Build,
        description: "I want to use my own token"
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
      }
    ],
    printComponent: PrintUpgradeTokenComponent
  },
  {
    count: 1,
    printCountMin: 1,
    printCountMax: 1,
    name: "New Module Token",
    description: "A new module you might be able to pick up",
    buildDescription: "",
    notes: (d : ShipData) => d.newModuleToken,
    buildOptions: [
      {
        type: MaterialBuildOptionType.Build,
        description: "I want to use my own token"
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
      }
    ],
    printComponent: PrintModuleTokenComponent
  },
  {
    count: 10,
    printCountMin: 10,
    printCountMax: 10,
    name: "Fuel Tokens",
    description: "Fuel that you have, or can collect.",
    buildDescription: "",
    notes: (d : ShipData) => d.fuelTokens,
    buildOptions: [
      {
        type: MaterialBuildOptionType.Build,
        description: "I want to use my own token"
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
      }
    ],
    printComponent: PrintFuelComponent
  }
];

export default materials;
