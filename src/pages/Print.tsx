import React, { useState, Fragment } from 'react';
import './Start.scss';
import slugify from 'slugify';
import './Print.scss';
import { useLocation } from 'react-router-dom';
import materials from 'data/materials';
import Material, { PrintComponentProps, MaterialBuildOptionType, MaterialBuildOption, buildOptionClasses, BuildOptionTypeDetails } from 'model/Materials';
import { IonPage, IonContent, IonGrid, IonCol, IonRow, IonImg, IonInput, IonItem, IonLabel } from '@ionic/react';
import Header from 'components/Header';
import MarkdownComponent from 'components/MarkdownComponent';

import PrintInstructions from 'content/Print/PrintInstructions.md';
import { find, isString, take, map, clone } from 'lodash';

interface PrintMaterialProps {
  Component?: React.FC<PrintComponentProps>,
  material: Material,
  buildOptionType: string,
  className?: string,
  count: number
}

const PrintMaterial: React.FC<PrintMaterialProps> = ({Component, buildOptionType, ...otherProps}) => {
  const buildOption: MaterialBuildOptionType | undefined =
    MaterialBuildOptionType[buildOptionType as keyof typeof MaterialBuildOptionType];
  if (Component == null || !buildOption) return (<></>);
  return (
    <Component buildOptionType={buildOption} {...otherProps} />
  );
}

interface PrintPreviewProps {
  material: Material,
  buildOptionType: string
}

const PrintPreview: React.FC<PrintPreviewProps> = ({material, buildOptionType}) => {
  const buildOption: MaterialBuildOption | undefined =
    find(material.buildOptions, bo => bo.type === buildOptionType);

  const Preview = buildOption?.preview;
  if (!buildOption || !Preview) return (<></>);

  const PreviewComponent = () => (
    <div className={`material-build-preview`}>
      {isString(Preview) ?
        <IonImg src={Preview || ''} />
        :
        <Preview className={buildOptionClasses(buildOption.type)}
          buildOptionType={buildOption.type} material={material} />
      }
    </div>
  );

  return (
    <div className="material-build-preview-container clear">
      <PreviewComponent />
    </div>
  );
}

const Print: React.FC = () => {
  var location = useLocation();

  const [,, ...buildOptions] = location.pathname.split('/');

  const materialsWithBuildOptions = take(materials, buildOptions.length);
  const [materialCounts, setMaterialCounts] = useState(map(materialsWithBuildOptions, m => m.printCountMax));

  function updateCount(index: number, countString: string) {
    var count : number = parseInt(countString);
    if (count < materialsWithBuildOptions[index].printCountMin)
      count = materialsWithBuildOptions[index].printCountMin;
    if (count > materialsWithBuildOptions[index].printCountMax)
      count = materialsWithBuildOptions[index].printCountMax;
    let newMaterialCounts = clone(materialCounts);
    newMaterialCounts[index] = count;
    setMaterialCounts(newMaterialCounts);
  }

  return (
    <div>
      <IonPage className="no-print">
        <Header />
        <IonContent>
          <div className="page-container">
            <MarkdownComponent source={PrintInstructions} />

            <IonGrid>
              <IonRow>
                {materialsWithBuildOptions.map((material, i) =>
                  <Fragment key={i}>
                    {BuildOptionTypeDetails[buildOptions[i]]?.isPrinted &&
                      <IonCol size="4">
                        <div>
                          <h5 className="ion-text-center">
                            {material.name} (x{material.printCountMin}{material.printCountMax > material.printCountMin && `-${material.printCountMax}`})
                          </h5>
                          {material.printCountMax > material.printCountMin &&
                            <>
                              {material.extraComponentDescription &&
                                <p className="ion-padding-horizontal ion-no-margin">{material.extraComponentDescription}</p>
                              }
                              <IonItem color="clear" style={{"--border-width": "0"}}>
                                <IonLabel># to print:</IonLabel>
                                <IonInput type="number"
                                  min={material.printCountMin?.toString()}
                                  max={material.printCountMax?.toString()}
                                  onIonChange={(e) => updateCount(i, e.detail.value!)}
                                  value={materialCounts[i]} />
                              </IonItem>
                            </>
                          }
                          <PrintPreview key={slugify(material.name)} material={material}
                            buildOptionType={buildOptions.length > i ? buildOptions[i] : ""} />

                        </div>
                      </IonCol>
                    }
                  </Fragment>
                )}
              </IonRow>
            </IonGrid>

            <p className="ion-text-center">
              Once you're finished, close this window to return.
            </p>
          </div>
        </IonContent>
      </IonPage>
      <div className="print-page only-print">
        {materialsWithBuildOptions.map((material, i) => (
          <PrintMaterial key={slugify(material.name)}
            Component={material.printComponent}
            material={material} count={materialCounts[i]}
            buildOptionType={buildOptions.length > i ? buildOptions[i] : ""} />
        ))}
      </div>
    </div>
  );
};

export default Print;
