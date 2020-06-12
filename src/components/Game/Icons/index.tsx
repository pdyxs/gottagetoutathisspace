import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import './Icons.scss';
import { IconProps } from "../Pieces";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSlash, faSquare, faSkullCrossbones, faBolt, faUserAstronaut, faWrench } from '@fortawesome/free-solid-svg-icons';
import { faWindowClose, faClone } from '@fortawesome/free-regular-svg-icons';
import { faPlusOctagon, faTombstone, faSnooze } from '@fortawesome/pro-solid-svg-icons';
import { faTint, faUnlink } from '@fortawesome/pro-regular-svg-icons';
import { faMediumM } from '@fortawesome/free-brands-svg-icons';

library.add(
  faSquare,
  faSkullCrossbones,
  faBolt,
  faUserAstronaut,
  faWrench,
  faPlusOctagon,
  faSlash,
  faSnooze,
  faTombstone,

  faWindowClose,
  faTint,
  faClone,
  faUnlink,

  faMediumM
);

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
