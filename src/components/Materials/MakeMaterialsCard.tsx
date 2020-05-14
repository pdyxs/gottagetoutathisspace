import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonSelect, IonSelectOption, IonImg } from '@ionic/react';
import React, { useLayoutEffect, useState } from 'react';

import './MakeMaterialsCard.scss';

import Material, { MaterialBuildOption, BuildOptionTypeDetails } from 'model/Materials';
import { isNil, first, isString } from 'lodash';
import classNames from 'classnames';

interface MakeMaterialsCardProps {
  material: Material
}

const MakeMaterialsCard: React.FC<MakeMaterialsCardProps> = ({material}) => {
  let select = React.useRef<HTMLIonSelectElement>(null);
  let [buildOption, setBuildOption] =
    useState<MaterialBuildOption|undefined>(first(material.buildOptions))

  useLayoutEffect(() => {
    if (!isNil(select.current)) {
      var style = document.createElement( 'style' );
      style.innerHTML = '.select-text { white-space: normal !important; }';
      select.current?.shadowRoot?.appendChild( style )
    }
  });

  const Preview = buildOption?.preview;

  return (
    <IonCard className="make-materials-card">
      <IonCardHeader>
        <IonCardSubtitle>{material.count}</IonCardSubtitle>
        <IonCardTitle>{material.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p>{material.description}</p>
        {material.buildDescription &&
          <p className="ion-padding-top">{material.buildDescription}</p>
        }
      </IonCardContent>
      {buildOption && Preview &&
        <div className="material-build-preview-container">
          <div className="material-build-preview">
            {isString(Preview) ?
              <IonImg src={Preview || ''} />
              :
              <Preview className={classNames(
                  `material-build-${buildOption.type}`, {
                  'printable': BuildOptionTypeDetails[buildOption.type].isPrinted,
                  'printer-friendly': BuildOptionTypeDetails[buildOption.type].isFriendly,
                  'show-detail': BuildOptionTypeDetails[buildOption.type].hasDetails
                })}
                buildOption={buildOption} material={material} />
            }
          </div>
        </div>
      }
      <IonSelect ref={select}
        className="select-material-creation"
        interface="action-sheet"
        interfaceOptions={{header: material.name}}
        value={buildOption}
        onIonChange={e => setBuildOption(e.detail.value)}>
        {material.buildOptions.map(buildOption =>
          <IonSelectOption value={buildOption} key={buildOption.type}>
            {buildOption.description}
          </IonSelectOption>
        )}
      </IonSelect>
    </IonCard>
  );
};

export default MakeMaterialsCard;
