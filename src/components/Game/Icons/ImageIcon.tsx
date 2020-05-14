import { IconProps } from "../Pieces";
import React from "react";
import { IonImg } from "@ionic/react";
import GetImageURL from "content/Pieces";

const ImageIcon : React.FC<IconProps> = ({content, className}) => {
  return <IonImg src={GetImageURL(content)} className={className} />
}

export default ImageIcon;
