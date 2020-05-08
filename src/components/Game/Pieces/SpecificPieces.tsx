import React from "react";
import { ControlProps, IconProps } from ".";
import { set } from "lodash";
import { CellContentTypes } from "../../../model/Level";

import PlayerControls from "../Controls/PlayerControls";
import PlayerDescription from 'content/Descriptions/PlayerDescription.md'
import { PlayerIcon, RobotIcon, CrewIcon, FuelIcon, UpgradeIcon, ModuleIcon, DivIcon, RobotFactoryIcon } from "../Icons";

import RobotDescription from 'content/Descriptions/RobotDescription.md';
import RobotControls from "../Controls/RobotControls";

import CrewDescription from 'content/Descriptions/CrewDescription.md';
import CrewControls from "../Controls/CrewControls";

import FuelDescription from 'content/Descriptions/FuelDescription.md';
// import FuelControls from "../Controls/FuelControls";

import UpgradeDescription from 'content/Descriptions/UpgradeDescription.md';

import ModuleDescription from 'content/Descriptions/ModuleDescription.md';

import StarDescription from 'content/Descriptions/StarDescription.md';

import PlanetDescription from 'content/Descriptions/PlanetDescription.md';

import RobotFactoryDescription from 'content/Descriptions/RobotFactoryDescription.md';
import UpgradeControls from "../Controls/UpgradeControls";
import NewModuleControls from "../Controls/NewModuleControls";

interface ContentTypeDefinition {
  controls?: React.FC<ControlProps>,
  description?: string,
  icon?: React.FC<IconProps>
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
      controls: PlayerControls,
      description: PlayerDescription,
      icon: PlayerIcon
    }
  },
  {
    key: CellContentTypes.Robot,
    val: {
      controls: RobotControls,
      description: RobotDescription,
      icon: RobotIcon
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
      // controls: FuelControls,
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
      icon: DivIcon,
      description: StarDescription
    }
  },
  {
    key: CellContentTypes.Planet,
    val: {
      icon: DivIcon,
      description: PlanetDescription
    }
  },
  {
    key: CellContentTypes.RobotFactory,
    val: {
      icon: RobotFactoryIcon,
      description: RobotFactoryDescription
    }
  }
]);

export default pieces;
