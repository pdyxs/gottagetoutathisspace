import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonSelect, IonSelectOption, IonImg } from '@ionic/react';
import React, { useLayoutEffect } from 'react';

import './MakeMaterialsCard.scss';

import Material, { MaterialBuildOption, buildOptionClasses } from 'model/Materials';
import { isNil, isString } from 'lodash';

interface MakeMaterialsCardProps {
  material: Material,
  buildOptionIndex: number,
  onBuildOptionChanged: (index:number) => void
}

const MakeMaterialsCard: React.FC<MakeMaterialsCardProps> = ({material, buildOptionIndex, onBuildOptionChanged}) => {
  let select = React.useRef<HTMLIonSelectElement>(null);
  const buildOption = material.buildOptions[buildOptionIndex]

  useLayoutEffect(() => {
    if (!isNil(select.current)) {
      var style = document.createElement( 'style' );
      style.innerHTML = '.select-text { white-space: normal !important; }';
      select.current?.shadowRoot?.appendChild( style )
    }
  });

  function updateBuildOption(newVal : MaterialBuildOption) {
    onBuildOptionChanged(material.buildOptions.indexOf(newVal));
  }

  const Preview = buildOption?.preview;

  return (
    <IonCard className="make-materials-card">
      <IonCardHeader>
        <IonCardSubtitle>{material.count}</IonCardSubtitle>
        <IonCardTitle>{material.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p>{material.description}</p>
      </IonCardContent>
      {buildOption && Preview &&
        <div className="material-build-preview-container">
          <div className="material-build-preview">
            {isString(Preview) ?
              <IonImg src={Preview || ''} />
              :
              <Preview className={buildOptionClasses(buildOption.type)}
                buildOptionType={buildOption.type} material={material} />
            }
          </div>
        </div>
      }
      <IonSelect ref={select}
        className="select-material-creation"
        interface="action-sheet"
        interfaceOptions={{header: material.name}}
        value={buildOption}
        onIonChange={e => updateBuildOption(e.detail.value)}>
        {material.buildOptions.map(buildOption =>
          <IonSelectOption value={buildOption} key={buildOption.type}>
            {buildOption.description}
          </IonSelectOption>
        )}
      </IonSelect>
      {material.buildDescription &&
        <IonCardContent>
          {material.buildDescription}
        </IonCardContent>
      }
    </IonCard>
  );
};

export default MakeMaterialsCard;
