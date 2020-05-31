import React, { useState } from "react";

import { IonButton, IonPopover, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonNote } from "@ionic/react";
import { ControlProps } from "../Pieces";
import MarkdownComponent from "components/MarkdownComponent";
import { take, shuffle } from "lodash";

import Crew from "model/Crew";
import allCrew from 'data/crew';

import './CrewControls.scss';

import IntroContent from 'content/Controls/CrewIntro.md';
import MakeCrewContent from 'content/Controls/MakeCrew.md';
import { CellContentTypes } from "model/Level";
import CrewCard from "../GameElements/CrewCard";

const crewOptionCount = 3;

const CrewControls : React.FC<ControlProps> = ({className, level, coordinates}) => {
  const [showIntroPopover, setShowIntroPopover] = useState(false);
  const [crewChosen, setCrewChosen] = useState<Crew | null>(null);
  const [crewOptions, setCrewOptions] = useState<Crew[]>([]);

  function setupCrew() {
    var crewOptions = take(shuffle(allCrew), crewOptionCount);

    setCrewOptions(crewOptions);

    setCrewChosen(null);

    setShowIntroPopover(true);
  }

  function chooseCrew(crew: Crew) {
    setShowIntroPopover(false);
    setCrewChosen(crew);
  }

  function doCrew() {
    level.changeCount(coordinates, CellContentTypes.Crew, -1);
    setCrewChosen(null);
  }

  return (
    <div slot="end" className={className}>
      <IonButton color="success" size="default" onClick={setupCrew}>
        Pick up
      </IonButton>
      <IonPopover
        isOpen={showIntroPopover}
        backdropDismiss={false}
        cssClass="popoverWithCard"
        onDidDismiss={() => setShowIntroPopover(false)}>
        <IonCard color="success">
          <IonCardHeader>
            <IonCardTitle>Ready to get outta here?</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <MarkdownComponent
              className="markdown-content" source={IntroContent} />
            {crewOptions.map(option =>
              <IonItem button onClick={() => chooseCrew(option)}
                className="popover-card-button-item crew-option-item"
                key={option.name} color="warning">
                <div slot="start" className="option crew-option">
                  <IonLabel>
                    {option.name}
                  </IonLabel>
                  <IonNote className="ion-padding-bottom">
                    {option.power}
                  </IonNote>
                </div>
              </IonItem>
            )}
            <IonItem button onClick={() => setShowIntroPopover(false)}>
              Whoops, I didn't mean to click that
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonPopover>

      <IonPopover isOpen={crewChosen !== null}
        backdropDismiss={false}
        cssClass="popoverWithCard"
        onDidDismiss={() => setCrewChosen(null)}>
        <IonCard color="success">
          <IonCardHeader>
            <IonCardTitle>
              Crew Got!
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <MarkdownComponent
              className="markdown-content"
              source={MakeCrewContent}
              transformations={{moduleName: crewChosen?.name || ''}} />
            <IonItem class="effectNote note handwritten">
              <CrewCard crew={crewChosen || undefined} name="<Your name>" />
            </IonItem>
            <IonItem button onClick={() => {setCrewChosen(null); setShowIntroPopover(true);}}>
              Actually, I might have a different role
            </IonItem>
            <IonItem button onClick={doCrew}>
              Done! Let's get back to it!
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonPopover>
    </div>
  );
}

export default CrewControls;
