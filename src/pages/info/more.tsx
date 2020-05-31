import React from 'react';
import { IonPage, IonContent, IonCard, IonCardContent } from '@ionic/react';
import Header from 'components/Header';

import MoreContent from 'content/Info/More.md';
import MarkdownComponent from 'components/MarkdownComponent';
import MailchimpSubscribe from "react-mailchimp-subscribe"


const url = "https://wtf.us2.list-manage.com/subscribe/post?u=fe518c2ac57c0f38bd905e2e4&amp;id=2807bd4d82";

const More: React.FC = () => {
  return (
    <div>
      <IonPage>
        <Header />
        <IonContent id="ggots-content">
          <div className="page-container why-page">
            <MarkdownComponent source={MoreContent} />
            <IonCard color="secondary">
              <IonCardContent>
                <div className="emailSignup centre">
                  <MailchimpSubscribe url={url} />
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default More;
