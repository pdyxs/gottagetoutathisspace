import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import './Icons.scss';
import { IconProps } from "../Pieces";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas as fasp } from '@fortawesome/pro-solid-svg-icons';
import { far as farp } from '@fortawesome/pro-regular-svg-icons';

library.add(fas);
library.add(far);
library.add(fasp);
library.add(farp);

export const FuelIcon : React.FC<IconProps> = ({className}) =>
  <FontAwesomeIcon className={className} icon={['fas', 'bolt']} />

export const CrewIcon : React.FC<IconProps> = ({className}) =>
  <FontAwesomeIcon className={className} icon={['fas', 'user-astronaut']} />

export const UpgradeIcon : React.FC<IconProps> = ({className}) =>
  <FontAwesomeIcon className={className} icon={['fas', 'wrench']} />

export const ModuleIcon : React.FC<IconProps> = ({className}) =>
  <FontAwesomeIcon className={className} icon={['fas', 'plus-octagon']} />

export const DivIcon : React.FC<IconProps> = ({className}) =>
  <div className={className}  />
