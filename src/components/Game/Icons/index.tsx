import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import './Icons.scss';
import { IconProps } from "../Pieces";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas as fasp } from '@fortawesome/pro-solid-svg-icons';

library.add(fas);
library.add(far);
library.add(fasp);

export const RobotIcon : React.FC<IconProps> = ({className}) =>
  <FontAwesomeIcon className={className} icon={['fas', 'user-robot']} />

export const RobotFactoryIcon : React.FC<IconProps> = ({className}) =>
  <FontAwesomeIcon className={className} icon={['fas', 'robot']} />

export const PlayerIcon : React.FC<IconProps> = ({className}) =>
  <FontAwesomeIcon className={className} icon={['fas', 'space-shuttle']} rotation={270} />

export const FuelIcon : React.FC<IconProps> = ({className}) =>
  <FontAwesomeIcon className={className} icon={['fas', 'bolt']} />

export const CrewIcon : React.FC<IconProps> = ({className}) =>
  <FontAwesomeIcon className={className} icon={['fas', 'user']} />

export const UpgradeIcon : React.FC<IconProps> = ({className}) =>
  <FontAwesomeIcon className={className} icon={['fas', 'tools']} />

export const ModuleIcon : React.FC<IconProps> = ({className}) =>
  <FontAwesomeIcon className={className} icon={['far', 'plus-square']} />

export const DivIcon : React.FC<IconProps> = ({className}) =>
  <div className={className}  />
