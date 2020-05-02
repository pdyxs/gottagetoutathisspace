import React from "react";
import { ControlProps, IconProps } from ".";
import { set } from "lodash";
import { CellContentTypes } from "../../../model/Level";

import PlayerControls from "../Controls/PlayerControls";
import PlayerDescription from "../Descriptions/PlayerDescription.md"
import { PlayerIcon, RobotIcon, CrewIcon, FuelIcon, UpgradeIcon, ModuleIcon } from "../Icons";

import RobotDescription from "../Descriptions/RobotDescription.md"
import RobotControls from "../Controls/RobotControls";

import CrewDescription from '../Descriptions/CrewDescription.md';
import CrewControls from "../Controls/CrewControls";

import FuelDescription from '../Descriptions/FuelDescription.md';
import FuelControls from "../Controls/FuelControls";

import UpgradeDescription from '../Descriptions/UpgradeDescription.md';

import ModuleDescription from '../Descriptions/ModuleDescription.md';

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
      controls: FuelControls,
      description: FuelDescription,
      icon: FuelIcon
    }
  },
  {
    key: CellContentTypes.Upgrade,
    val: {
      controls: CrewControls,
      description: UpgradeDescription,
      icon: UpgradeIcon
    }
  },
  {
    key: CellContentTypes.Module,
    val: {
      controls: CrewControls,
      description: ModuleDescription,
      icon: ModuleIcon
    }
  }
]);

export default pieces;
