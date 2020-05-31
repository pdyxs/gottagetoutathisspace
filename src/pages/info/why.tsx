import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import Header from 'components/Header';

import WhyContent from 'content/Info/Why.md';
import MarkdownComponent from 'components/MarkdownComponent';

const Why: React.FC = () => {
  return (
    <div>
      <IonPage>
        <Header />
        <IonContent id="ggots-content">
          <div className="page-container why-page">
            <MarkdownComponent source={WhyContent} />
          </div>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default Why;
