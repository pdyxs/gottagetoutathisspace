import React, { useState } from 'react';
import { IonPage, IonContent, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonLoading, IonItem, IonLabel, IonText, IonInput, IonButton, IonCardHeader, IonCardTitle } from '@ionic/react';
import Header from 'components/Header';

import MoreContent from 'content/Info/More.md';
import MarkdownComponent from 'components/MarkdownComponent';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { subscribe } from 'firebaseConfig';
import { toast } from 'toast';

const More: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [busy, setBusy] = useState(false);

  async function doSubscribe() {
    if (!executeRecaptcha) {
      return;
    }
    setBusy(true);
    const captcha = await executeRecaptcha("homepage");
    const didSubscribe : boolean = await subscribe(captcha, name, email, "Gotta Get Outta This Space: More");
    let message = "Failed to subscribe :(. Are you a robot?";
    if (didSubscribe) {
      message = "Subscription Successful! Check your email for to confirm!";
    }
    toast(message);
    setName('');
    setEmail('');
    setBusy(false);
  }

  return (
    <div>
      <IonLoading isOpen={busy} message="Subscribing..." />
      <IonPage>
        <Header />
        <IonContent id="ggots-content">
          <div className="page-container why-page">
            <IonGrid>
              <IonRow>
                <IonCol size="12" sizeMd="7">
                  <MarkdownComponent source={MoreContent} />
                  <IonCard color="tertiary">
                    <IonCardContent>
                      <form onSubmit={e => {doSubscribe(); e.preventDefault();}}>
                        <IonItem color="tertiary">
                          <IonLabel slot="start">Your name <IonText color="danger">*</IonText></IonLabel>
                          <IonInput value={name} onIonChange={e => setName(e.detail.value!)} required type="text" placeholder="Who are you?" />
                        </IonItem>
                        <IonItem color="tertiary">
                          <IonLabel slot="start">Email <IonText color="danger">*</IonText></IonLabel>
                          <IonInput value={email} onIonChange={e => setEmail(e.detail.value!)} required type="email" inputmode="email" placeholder="How should the emails get to you?" />
                        </IonItem>
                        <IonItem>
                          <IonText color="medium" className="text-small camo-links">
                            This site is protected from robots by reCAPTCHA and the
                            Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.
                          </IonText>
                        </IonItem>
                        <IonButton type="submit" expand="block">Subscribe</IonButton>
                      </form>
                    </IonCardContent>
                  </IonCard>
                </IonCol>

                <IonCol size="12" sizeMd="5">
                  <IonCard color="light">
                    <IonCardHeader>
                      <IonCardTitle>What's next?</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent className="ion-no-padding">
                      <IonItem color="clear">
                        The next project I'm working on is also an old project: Particulars.
                      </IonItem>
                      <iframe title="Particulars Trailer" style={{width: "100%"}} src="https://www.youtube.com/embed/eSgq_U30vp8" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}>
                      </iframe>
                      <IonItem color="clear">
                        <div>
                          <p className="ion-padding-bottom">
                            Particulars is a game made by SeeThrough Studios back in 2014, about life, the universe and sub-atomic particle physics.
                          </p>
                          <p className="ion-padding-bottom">
                            The goal of this project is to build a website that showcases the educational aspects of the game, by embedding playable levels into that website.
                          </p>
                          <p className="ion-padding-bottom">
                            At the same time, we're going to make the original game free to play on all platforms, and make it work on OSX again (it broke sometime last year).
                          </p>
                          <p className="ion-padding-bottom">
                            I'm aiming to launch this in <b>mid-July 2020</b>
                          </p>
                        </div>
                      </IonItem>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default More;
