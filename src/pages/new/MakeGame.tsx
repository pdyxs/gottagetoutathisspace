import { IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';
import React, { useState } from 'react';
import { InstructionPageProps } from '../../components/InstructionFlow';

import Content from 'content/New/Make.md';
import MarkdownComponent from 'components/MarkdownComponent';
import materials from 'data/materials';
import MakeMaterialsCard from 'components/Materials/MakeMaterialsCard';
import { clone, isNil } from 'lodash';
import { BuildOptionTypeDetails, MaterialBuildOptionType } from 'model/Materials';

const MakeGame: React.FC<InstructionPageProps> = ({nextUrl}) => {
  const [buildOptions, setBuildOptions] = useState(materials.map(_m => 0));

  function updateBuildOption(materialIndex: number, index: number) {
    let newBuildOptions = clone(buildOptions);
    newBuildOptions[materialIndex] = index;
    setBuildOptions(newBuildOptions);
  }

  const materialBuildOptionTypes : MaterialBuildOptionType[] = materials.map((m,i) => {
    let targetBuildOptionIndex = buildOptions[i];
    if (m.buildOptions.length <= targetBuildOptionIndex)
      return MaterialBuildOptionType.None;
    return m.buildOptions[targetBuildOptionIndex]?.type || MaterialBuildOptionType.None;
  });
  const printurl = materialBuildOptionTypes.join('/');

  const isPrintable = !isNil(materialBuildOptionTypes.find(
    bot => BuildOptionTypeDetails[bot].isPrinted
  ));

  const needsBuildInstructions = !isNil(materialBuildOptionTypes.find(
    bot => BuildOptionTypeDetails[bot].needsBuildInstructions
  ));

  return (
    <div className="ion-text-center ion-padding">
      <div className="page-container">
        <MarkdownComponent source={Content} />

        <IonGrid>
          <IonRow>
            {materials.map((material, i) =>
              <IonCol key={i} size="12" size-sm="6">
                <MakeMaterialsCard material={material}
                  onBuildOptionChanged={(j) => updateBuildOption(i, j)}
                  />
              </IonCol>
            )}
          </IonRow>
        </IonGrid>

        {isPrintable &&
          <div className="ion-text-center">
            <p>
              You've chosen to print some items. Click this button to do that!
            </p>
            <IonButton href={`/print/${printurl}`}
              target="_blank" rel="noopener noreferrer">Print</IonButton>
          </div>
        }

        {needsBuildInstructions &&
          <div className="ion-text-center">
            <p>
              You've chosen to make some cards. Click here to see the details of the cards you want to make!
            </p>
            <IonButton href={`/make/${printurl}`}
              target="_blank" rel="noopener noreferrer">Make</IonButton>
          </div>
        }

        <div className="ion-text-center">
          <p>
            Once you've finished making components, click here to continue
          </p>
          <IonButton href={nextUrl}>Great, let's start!</IonButton>
        </div>
      </div>
    </div>
  );
};

export default MakeGame;
