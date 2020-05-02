import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import './Icons.scss';
import { IconProps } from "../Pieces";

export const RobotIcon : React.FC<IconProps> = ({className}) =>
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
