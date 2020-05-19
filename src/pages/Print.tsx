import React from 'react';
import './Start.scss';
import slugify from 'slugify';
import './Print.scss';
import { useLocation } from 'react-router-dom';
import materials from 'data/materials';
import Material, { PrintComponentProps, MaterialBuildOptionType } from 'model/Materials';
import { IonPage, IonContent } from '@ionic/react';
import Header from 'components/Header';

interface PrintMaterialProps {
  Component?: React.FC<PrintComponentProps>,
  material: Material,
  buildOptionType: string,
  className?: string
}

const PrintMaterial: React.FC<PrintMaterialProps> = ({Component, buildOptionType, ...otherProps}) => {
  const buildOption: MaterialBuildOptionType | undefined =
    MaterialBuildOptionType[buildOptionType as keyof typeof MaterialBuildOptionType];
  if (Component == null || !buildOption) return (<></>);
  return (
    <Component buildOptionType={buildOption} {...otherProps} />
  );
}

const Print: React.FC = () => {
  var location = useLocation();

  const [,, ...buildOptions] = location.pathname.split('/');

  return (
    <div>
      <IonPage className="no-print">
        <Header />
        <IonContent>
          <div className="">
          </div>
        </IonContent>
      </IonPage>
      <div className="print-page only-print">
        {materials.map((material, i) => (
          <PrintMaterial key={slugify(material.name)}
            Component={material.printComponent}
            material={material}
            buildOptionType={buildOptions.length > i ? buildOptions[i] : ""} />
        ))}
      </div>
    </div>
  );
};

export default Print;
