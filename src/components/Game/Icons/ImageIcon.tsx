import { IconProps } from "../Pieces";
import React from "react";
import { IonImg } from "@ionic/react";
import GetImageURL from "content/Pieces";
import classNames from "classnames";

const ImageIcon : React.FC<IconProps> = ({content, className, isPrinterFriendly}) => {
  return <IonImg src={GetImageURL(content, isPrinterFriendly)} className={classNames(className, "img-icon")} />
}

export default ImageIcon;
