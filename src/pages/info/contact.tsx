import React, { useState } from 'react';
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonItem, IonLabel, IonInput, IonTextarea, IonText, IonCheckbox, IonButton, IonLoading, IonIcon } from '@ionic/react';
import Header from 'components/Header';

import ContactContent from 'content/Info/Contact.md';
import MarkdownComponent from 'components/MarkdownComponent';
import { sendEmail } from 'firebaseConfig';
import { logoInstagram, logoTwitter, logoGithub, globeOutline, mailOutline } from 'ionicons/icons';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { toast } from 'toast';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [subscribe, setSubscribe] = useState(true);
  const [busy, setBusy] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  async function doSendEmail() {
    if (!executeRecaptcha) {
      return;
    }
    setBusy(true);
    const captcha = await executeRecaptcha("homepage");
    const didSendEmail : boolean = await sendEmail(captcha, name, email, subject, body, subscribe);
    let message = "Message failed to send :(. Are you a robot?";
    if (didSendEmail) {
      if (!subscribe) {
        message = "Message Sent! We'll get back to you shortly!";
      } else {
        message = "Message Sent! Check your email to confirm your subscription to the mailing list."
      }
    }
    toast(message);
    setName('');
    setEmail('');
    setSubject('');
    setBody('');
    setSubscribe(true);
    setBusy(false);
  }

  return (
    <div>
      <IonLoading isOpen={busy} message="Sending your message..." />
      <IonPage>
        <Header />
        <IonContent id="ggots-content">
          <div className="page-container why-page">
            <h2 className="centre">How to get in touch</h2>
            <IonGrid>
              <IonRow>
                <IonCol size="12" sizeMd="5">
                  <MarkdownComponent source={ContactContent} />
                  <div className="social">
                    <a href="https://www.instagram.com/pdyxs/" target="_blank" rel="noopener noreferrer">
                      <IonIcon size="large" icon={logoInstagram} />
                    </a>
                    <a href="https://twitter.com/pdyxs" target="_blank" rel="noopener noreferrer">
                      <IonIcon size="large" icon={logoTwitter} />
                    </a>
                    <a href="https://github.com/pdyxs" target="_blank" rel="noopener noreferrer">
                      <IonIcon size="large" icon={logoGithub} />
                    </a>
                    <a href="https://pdyxs.wtf" target="_blank" rel="noopener noreferrer">
                      <IonIcon size="large" icon={globeOutline} />
                    </a>
                    <a href="mailto:talk@pdyxs.wtf" target="_blank" rel="noopener noreferrer">
                      <IonIcon size="large" icon={mailOutline} />
                    </a>
                  </div>
                </IonCol>
                <IonCol size="12" sizeMd="7">
                  <IonCard>
                    <IonCardContent>
                      <form onSubmit={e => {doSendEmail(); e.preventDefault();}}>
                        <IonItem>
                          <IonLabel slot="start">Your name <IonText color="danger">*</IonText></IonLabel>
                          <IonInput value={name} onIonChange={e => setName(e.detail.value!)} required type="text" placeholder="Who are you?" />
                        </IonItem>
                        <IonItem>
                          <IonLabel slot="start">Email <IonText color="danger">*</IonText></IonLabel>
                          <IonInput value={email} onIonChange={e => setEmail(e.detail.value!)} required type="email" inputmode="email" placeholder="How can we reply?" />
                        </IonItem>
                        <IonItem>
                          <IonLabel slot="start">Subject</IonLabel>
                          <IonInput value={subject} onIonChange={e => setSubject(e.detail.value!)} type="text" placeholder="What's this about?" />
                        </IonItem>
                        <IonItem>
                          <IonCheckbox checked={subscribe} onIonChange={e => setSubscribe(e.detail.checked)} slot="start" />
                          <IonText>Send me updates about this and other projects</IonText>
                        </IonItem>
                        <IonItem>
                          <IonTextarea rows={5} value={body} onIonChange={e => setBody(e.detail.value!)} autoGrow placeholder="What do you want to say?" />
                        </IonItem>
                        <IonButton type="submit" expand="block">Send</IonButton>
                      </form>
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

export default Contact;
