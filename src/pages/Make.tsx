import React, { Fragment } from 'react';
import slugify from 'slugify';
import { useLocation } from 'react-router-dom';
import materials from 'data/materials';
import Material, { PrintComponentProps, MaterialBuildOptionType, BuildOptionTypeDetails } from 'model/Materials';
import { IonPage, IonContent } from '@ionic/react';
import Header from 'components/Header';
import MarkdownComponent from 'components/MarkdownComponent';

import './Make.scss';

import MakeInstructions from 'content/Print/MakeInstructions.md';
import { take } from 'lodash';

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

const Make: React.FC = () => {
  var location = useLocation();

  const [,, ...buildOptions] = location.pathname.split('/');

  const materialsWithBuildOptions = take(materials, buildOptions.length);

  return (
    <div>
      <IonPage>
        <Header />
        <IonContent id="ggots-content">
          <div className="page-container">
            <MarkdownComponent source={MakeInstructions} />

            {materialsWithBuildOptions.map((material, i) =>
              <Fragment key={i}>
                {BuildOptionTypeDetails[buildOptions[i]]?.needsBuildInstructions &&
                  <div>
                    <h3 className="ion-text-center">
                      {material.name}
                    </h3>
                    <div className="make-container">
                      <PrintMaterial key={slugify(material.name)}
                        Component={material.printComponent}
                        material={material} count={material.printCountMin}
                        buildOptionType={MaterialBuildOptionType.PrintFriendly} />
                    </div>
                  </div>
                }
              </Fragment>
            )}

            <p className="ion-text-center">
              Once you're finished, close this window to return.
            </p>
          </div>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default Make;
