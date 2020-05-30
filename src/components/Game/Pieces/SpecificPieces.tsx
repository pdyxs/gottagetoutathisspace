import React from "react";
import { ControlProps, IconProps } from ".";
import { set } from "lodash";
import { CellContentTypes, PlanetTypes, StarTypes } from "../../../model/Level";

import PlayerDescription from 'content/Descriptions/PlayerDescription.md'
import { CrewIcon, FuelIcon, UpgradeIcon, ModuleIcon } from "../Icons";

import RobotDescription from 'content/Descriptions/RobotDescription.md';

import CrewDescription from 'content/Descriptions/CrewDescription.md';
import CrewControls from "../Controls/CrewControls";

import FuelDescription from 'content/Descriptions/FuelDescription.md';

import UpgradeDescription from 'content/Descriptions/UpgradeDescription.md';

import ModuleDescription from 'content/Descriptions/ModuleDescription.md';

import StarDescription from 'content/Descriptions/StarDescription.md';
import StarCardText from 'content/CardText/Star.md';

import PlanetDescription from 'content/Descriptions/PlanetDescription.md';
import PlanetCardText from 'content/CardText/Planet.md';

import RobotFactoryDescription from 'content/Descriptions/RobotFactoryDescription.md';
import RobotFactoryCardText from 'content/CardText/RobotFactory.md';

import SpaceStationCardText from 'content/CardText/SpaceStation.md';
import SpaceStationDescription from 'content/Descriptions/SpaceStation.md';

import AsteroidFieldCardText from 'content/CardText/AsteroidField.md';
import AsteroidFieldDescription from 'content/Descriptions/AsteroidField.md';

import GasCloudDescription from 'content/Descriptions/GasCloud.md';
import GasCloudCardText from 'content/CardText/GasCloud.md';

import UpgradeControls from "../Controls/UpgradeControls";
import NewModuleControls from "../Controls/NewModuleControls";
import ImageIcon from "../Icons/ImageIcon";

interface ContentTypeDefinition {
  controls?: React.FC<ControlProps>,
  description?: string,
  icon?: React.FC<IconProps>,
  cardText?: string,
  name?: {[id: string]: string} | string
}

interface ConceptTypeKeyValuePair {
  key: string, val: ContentTypeDefinition
}

function setAll(keyVals: ConceptTypeKeyValuePair[]) : {[id: string]: ContentTypeDefinition} {
  let ret = {};
  for (var i = 0; i !== keyVals.length; ++i) {
    ret = set(ret, keyVals[i].key, keyVals[i].val);
  }
  return ret;
}

const pieces = setAll([
  {
    key: CellContentTypes.Player,
    val: {
      description: PlayerDescription,
      icon: ImageIcon
    }
  },
  {
    key: CellContentTypes.Robot,
    val: {
      description: RobotDescription,
      icon: ImageIcon
    }
  },
  {
    key: CellContentTypes.Crew,
    val: {
      controls: CrewControls,
      description: CrewDescription,
      icon: CrewIcon
    }
  },
  {
    key: CellContentTypes.Fuel,
    val: {
      description: FuelDescription,
      icon: FuelIcon
    }
  },
  {
    key: CellContentTypes.Upgrade,
    val: {
      controls: UpgradeControls,
      description: UpgradeDescription,
      icon: UpgradeIcon
    }
  },
  {
    key: CellContentTypes.Module,
    val: {
      controls: NewModuleControls,
      description: ModuleDescription,
      icon: ModuleIcon
    }
  },
  {
    key: CellContentTypes.Star,
    val: {
      name: {
        [StarTypes.BlueGiant]: "Blue Star",
        [StarTypes.Yellow]: "Yellow Star",
        [StarTypes.RedDwarf]: "Red Star",
        [StarTypes.BlackHole]: "Black Hole"
      },
      icon: ImageIcon,
      description: StarDescription,
      cardText: StarCardText
    }
  },
  {
    key: CellContentTypes.Planet,
    val: {
      name: {
        [PlanetTypes.GasGiant]: "Gas Giant",
        [PlanetTypes.Rocky]: "Rocky Planet"
      },
      icon: ImageIcon,
      description: PlanetDescription,
      cardText: PlanetCardText
    }
  },
  {
    key: CellContentTypes.RobotFactory,
    val: {
      name: "Robot Factory",
      icon: ImageIcon,
      description: RobotFactoryDescription,
      cardText: RobotFactoryCardText
    }
  },
  {
    key: CellContentTypes.SpaceStation,
    val: {
      name: "Space Station",
      cardText: SpaceStationCardText,
      description: SpaceStationDescription,
      icon: ImageIcon
    }
  },
  {
    key: CellContentTypes.AsteroidField,
    val: {
      name: "Asteroid Field",
      description: AsteroidFieldDescription,
      cardText: AsteroidFieldCardText,
      icon: ImageIcon
    }
  },
  {
    key: CellContentTypes.GasCloud,
    val: {
      name: "Gas Cloud",
      description: GasCloudDescription,
      cardText: GasCloudCardText,
      icon: ImageIcon
    }
  }
]);

export default pieces;
