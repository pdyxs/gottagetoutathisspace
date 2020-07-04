import { IonGrid, IonRow, IonCol, IonButton, IonFooter, IonItem } from '@ionic/react';
import React, { useState, useEffect, useCallback } from 'react';
import { InstructionPageProps } from '../../components/InstructionFlow';

import Content from 'content/New/Make.md';
import MarkdownComponent from 'components/MarkdownComponent';
import materials from 'data/materials';
import MakeMaterialsCard from 'components/Materials/MakeMaterialsCard';
import { clone, isNil, has, findIndex } from 'lodash';
import { BuildOptionTypeDetails, MaterialBuildOptionType, MaterialPresets, MaterialPreset } from 'model/Materials';

const MakeGame: React.FC<InstructionPageProps> = ({nextUrl}) => {
  const [buildOptions, setBuildOptions] = useState(materials.map(_m => 0));
  const [isUsingPresets, setIsPresets] = useState(MaterialPresets.map(_ => false));

  const checkPresets = useCallback(() => {
    var newUsingPresets = MaterialPresets.map(_ => true);
    for (let i = 0; i !== MaterialPresets.length; ++i) {
      var preset = MaterialPresets[i];
      for (let materialIndex = 0; materialIndex !== materials.length; ++materialIndex) {
        let material = materials[materialIndex];
        if (!has(preset.preset, material.type.toString())) continue;
        let targetBuildOptionIndex = buildOptions[materialIndex];
        let buildOption = (material.buildOptions.length <= targetBuildOptionIndex) ? MaterialBuildOptionType.None : (material.buildOptions[targetBuildOptionIndex]?.type || MaterialBuildOptionType.None);
        if (buildOption !== preset.preset[material.type.toString()]) {
          newUsingPresets[i] = false;
          break;
        }
      }
    }
    setIsPresets(newUsingPresets);
  }, [buildOptions]);
  useEffect(() => {
    checkPresets();
  }, [checkPresets]);

  function updateBuildOption(materialIndex: number, index: number) {
    let newBuildOptions = clone(buildOptions);
    newBuildOptions[materialIndex] = index;
    setBuildOptions(newBuildOptions);
  }

  function enablePreset(preset: MaterialPreset) {
    let newBuildOptions = clone(buildOptions);
    for (let materialIndex = 0; materialIndex !== materials.length; ++materialIndex) {
      let material = materials[materialIndex];
      if (has(preset.preset,material.type.toString())) {
        var newIndex = findIndex(material.buildOptions, o => o.type === preset.preset[material.type.toString()]);
        if (newIndex >= 0) {
          newBuildOptions[materialIndex] = newIndex;
        }
      }
    }
    setBuildOptions(newBuildOptions);
  }

  const materialBuildOptionTypes : MaterialBuildOptionType[] = materials.map((m,i) => {
    let targetBuildOptionIndex = buildOptions[i];
    if (m.buildOptions.length <= targetBuildOptionIndex)
      return MaterialBuildOptionType.None;
    return m.buildOptions[targetBuildOptionIndex]?.type || MaterialBuildOptionType.None;
  });
  const printurl = materialBuildOptionTypes.join('/');

  const isBuying = materialBuildOptionTypes.includes(MaterialBuildOptionType.Buy);

  const isPrintable = !isNil(materialBuildOptionTypes.find(
    bot => BuildOptionTypeDetails[bot].isPrinted
  ));

  const needsBuildInstructions = !isNil(materialBuildOptionTypes.find(
    bot => BuildOptionTypeDetails[bot].needsBuildInstructions
  ));

  return (
    <>
      <div className="ion-text-center ion-padding">
        <div className="page-container">
          <MarkdownComponent source={Content} />

          <h4 className="centre">Presets</h4>
          <div className="ion-text-center">
            {MaterialPresets.map((preset, i) =>
              <IonButton onClick={() => enablePreset(preset)} key={preset.id} color={isUsingPresets[i] ? "dark" : "primary"}>
                {preset.name}
              </IonButton>
            )}
          </div>

          <div className="ion-text-center">
            <p>
              Once you've finished making components, click here to continue
            </p>
            <IonButton routerLink={nextUrl}>Great, let's start!</IonButton>
          </div>

          <IonGrid>
            <IonRow>
              {materials.map((material, i) =>
                <IonCol key={`${i}-${buildOptions[i]}`} size="12" size-sm="6">
                  <MakeMaterialsCard material={material} buildOptionIndex={buildOptions[i]}
                    onBuildOptionChanged={(j) => updateBuildOption(i, j)}
                    />
                </IonCol>
              )}
            </IonRow>
          </IonGrid>

          <div className="ion-text-center">
            <p>
              Once you've finished making components, click here to continue
            </p>
            <IonButton routerLink={nextUrl}>Great, let's start!</IonButton>
          </div>

          <div className="pad-large" />
        </div>
      </div>
      <IonFooter className="footer-fixed">
        {isBuying &&
          <IonItem color="dark" className="ion-text-center page-container">
            <p>
              You've chosen to buy some items. Click this button to do that!
            </p>
            <IonButton slot="end" size="large" href={`/buy`}
              target="_blank" rel="noopener noreferrer">Buy</IonButton>
          </IonItem>
        }

        {isPrintable &&
          <IonItem color="dark" className="ion-text-center page-container">
            <div>
              <div>
                You've chosen to print some items. Click this button to do that!
              </div>
              <div>
                <b>OR</b> download a PDF with <a rel="noopener noreferrer" target="_blank" href="/assets/print-full.pdf">
                  everything
                </a> (<a rel="noopener noreferrer" target="_blank" href="/assets/print-full-friendly.pdf">
                  printer friendly
                </a>)
              </div>
            </div>
            <IonButton slot="end" size="large" href={`/print/${printurl}`}
              target="_blank" rel="noopener noreferrer">Print</IonButton>
          </IonItem>
        }

        {needsBuildInstructions &&
          <IonItem color="dark" className="ion-text-center page-container">
            <p>
              You've chosen to make some cards. Click here to see the details of the pieces you want to make!
            </p>
            <IonButton slot="end" size="large" href={`/make/${printurl}`}
              target="_blank" rel="noopener noreferrer">Make</IonButton>
          </IonItem>
        }
      </IonFooter>
    </>
  );
};

export default MakeGame;
