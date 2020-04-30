import { IonContent, IonButton } from '@ionic/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { InstructionPageProps } from '../../components/InstructionFlow';
import { ShipData } from '../../redux/actions';
import ReactMarkdown from 'react-markdown';
import Content from '../content/History.mdx';
import { reduce, replace } from 'lodash';

function transformReact(content: string, transformations: {[id: string]: any}) : string {
  return reduce(transformations, (currentContent, val, key) => {
    return replace(currentContent, new RegExp(`{${key}}`, 'g'), val || '');
  }, content);
}

const ContinueHistory: React.FC<InstructionPageProps> = ({nextUrl}) => {
  const shipData = useSelector((state: any) => state.shipData) as ShipData;
  const markdownData = {
    shipName: shipData.shipName,
    levelsComplete: shipData.levelsComplete || '0'
  };

  return (
    <IonContent>
      <div className="page-container">
        <ReactMarkdown source={transformReact(Content, markdownData)} />
        <h2>Welcome to the SS {shipData.shipName}</h2>
        <p>
          This ship has made it through {shipData.levelsComplete} star
          systems so far… here’s hoping that you’ll make it one more!</p>
        <p>
          You can see the path charted by the SS {shipData.shipName} below!
        </p>
        <IonButton routerLink={nextUrl}>
          Enough with the history, let's save humanity already!
        </IonButton>
      </div>
    </IonContent>
  );
};

export default ContinueHistory;
