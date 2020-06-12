import React from 'react';
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonImg, IonAvatar, IonIcon } from '@ionic/react';
import Header from 'components/Header';

import PaulInfo from 'content/Info/Paul.md';

import WhoContent from 'content/Info/Who.md';
import MarkdownComponent from 'components/MarkdownComponent';

import PaulPic from 'content/Info/paul_profile.jpg';

import './who.scss';
import { logoInstagram, logoTwitter, mailOutline, logoGithub, globeOutline } from 'ionicons/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Who: React.FC = () => {
  return (
    <div>
      <IonPage>
        <Header />
        <IonContent id="ggots-content">
          <div className="page-container who-page">
            <div className="centre">
              <h2>Who Made This?</h2>
            </div>
            <IonGrid>
              <IonRow>
                <IonCol size="12" sizeMd="6">
                  <IonCard>
                    <IonCardContent>
                      <IonAvatar className="profile-container" >
                        <IonImg className="profile" src={PaulPic} />
                      </IonAvatar>
                      <MarkdownComponent source={PaulInfo} />
                      <div className="social">
                        <a href="https://www.instagram.com/pdyxs/" target="_blank" rel="noopener noreferrer">
                          <IonIcon size="large" icon={logoInstagram} />
                        </a>
                        <a href="https://medium.com/@pdyxs" target="_blank" rel="noopener noreferrer">
                          <FontAwesomeIcon size="2x" style={{marginBottom: '4px'}} icon={['fab', 'medium-m']} />
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
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol size="12" sizeMd="6">
                  <div className="centre">
                    <p>Gotta Get Outta This Space was made by Paul Sztajer</p>
                    <p>Alistair Magee created most of the game's art.</p>
                    <p>The <a href="https://open.spotify.com/playlist/4cOim4pWFKu5r55hteThnZ?si=imaxOctlS5m4NowIxw7zZQ" target="_blank" rel="noopener noreferrer">
                        Official Playlist</a> was created by Yasmin Clarke</p>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>

            <MarkdownComponent source={WhoContent} />
          </div>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default Who;
