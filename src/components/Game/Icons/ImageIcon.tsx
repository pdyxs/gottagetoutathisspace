import { IconProps } from "../Pieces";
import React from "react";
import { IonImg } from "@ionic/react";
import GetImageURL from "content/Pieces";
import classNames from "classnames";

const ImageIcon : React.FC<IconProps> = ({content, className}) => {
  return <IonImg src={GetImageURL(content)} className={classNames(className, "img-icon")} />
}

export default ImageIcon;
