import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useLayoutEffect } from 'react';

import './MakeMaterialsCard.scss';

import Material from 'model/Materials';
import { isNil } from 'lodash';

interface MakeMaterialsCardProps {
  material: Material
}

const MakeMaterialsCard: React.FC<MakeMaterialsCardProps> = ({material}) => {
  let select = React.useRef<HTMLIonSelectElement>(null);

  useLayoutEffect(() => {
    if (!isNil(select.current)) {
      var style = document.createElement( 'style' );
      style.innerHTML = '.select-text { white-space: normal !important; }';
      select.current?.shadowRoot?.appendChild( style )
    }
  })


  return (
    <IonCard className="make-materials-card">
      <IonCardHeader>
        <IonCardSubtitle>{material.count}</IonCardSubtitle>
        <IonCardTitle>{material.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p>{material.explanation}</p>
      </IonCardContent>
        <IonSelect ref={select}
          className="select-material-creation"
          interface="action-sheet"
          interfaceOptions={{header: material.name}}>
          <IonSelectOption value="brown">I want to buy a nice deck</IonSelectOption>
          <IonSelectOption value="blonde">I want to print them</IonSelectOption>
          <IonSelectOption value="black">I want to print them, but be friendly to my printer</IonSelectOption>
          <IonSelectOption value="red">I want to print the words but draw the space things myself</IonSelectOption>
          <IonSelectOption value="red">I want to make them myself</IonSelectOption>
        </IonSelect>
    </IonCard>
  );
};

export default MakeMaterialsCard;
