import React, { useState } from "react";

import { IonButton, IonPopover, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonNote } from "@ionic/react";
import { ControlProps } from "../Pieces";
import MarkdownComponent from "components/MarkdownComponent";
import ShipModule from "model/Module";
import { take, shuffle, times } from "lodash";
import ShipModules from 'data/modules';
import classNames from "classnames";

import IntroContent from 'content/Controls/ModuleIntro.md';
import MakeModuleContent from 'content/Controls/MakeModule.md';
import { CellContentTypes } from "model/Level";

import './NewModuleControls.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const moduleOptionCount = 3;

const NewModuleControls : React.FC<ControlProps> = ({className, level, coordinates}) => {
  const [showIntroPopover, setShowIntroPopover] = useState(false);
  const [moduleChosen, setModuleChosen] = useState<ShipModule | null>(null);
  const [moduleOptions, setModuleOptions] = useState<ShipModule[]>([]);

  function setupModule() {
    var modules = take(shuffle(ShipModules), moduleOptionCount);

    setModuleOptions(modules);

    setModuleChosen(null);

    setShowIntroPopover(true);
  }

  function chooseModule(module: ShipModule) {
    setShowIntroPopover(false);
    setModuleChosen(module);
  }

  function doModule() {
    level.changeCount(coordinates, CellContentTypes.Module, -1);
    setModuleChosen(null);
  }

  return (
    <div slot="end" className={className}>
      <IonButton color="success" size="default" onClick={setupModule}>
        Pick up
      </IonButton>
      <IonPopover
        isOpen={showIntroPopover}
        backdropDismiss={false}
        cssClass="popoverWithCard"
        onDidDismiss={() => setShowIntroPopover(false)}>
        <IonCard color="success">
          <IonCardHeader>
            <IonCardTitle>Add-ons ahoy!</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <MarkdownComponent
              className="markdown-content" source={IntroContent} />
            {moduleOptions.map(option =>
              <IonItem button onClick={() => chooseModule(option)}
                className="popover-card-button-item module-option-item"
                key={option.name} color="warning">
                <div slot="start" className="option module-option">
                  <IonLabel>
                    <span className={classNames("module", `module-${option.type}`)}>{option.name}</span>
                  </IonLabel>
                </div>
                <div slot="start" className="option module-option">
                  <IonNote className="ion-padding-bottom">
                    {option.basicEffects.map((effect, i) =>
                      <div key={i}>{effect}</div>
                    )}
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

      <IonPopover isOpen={moduleChosen !== null}
        backdropDismiss={false}
        cssClass="popoverWithCard"
        onDidDismiss={() => setModuleChosen(null)}>
        <IonCard color="success">
          <IonCardHeader>
            <IonCardTitle>
              New Module Acquired!
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <MarkdownComponent
              className="markdown-content"
              source={MakeModuleContent}
              transformations={{moduleName: moduleChosen?.name || ''}} />
            <IonItem color="notebook" class="effectNote note handwritten">
              <div slot="start" className="full-width">
                <div className="note-heading">{moduleChosen?.name}</div>
                {moduleChosen?.basicEffects.map((effect,i) =>
                  <div key={i} className="note-content ion-padding-bottom">{effect}</div>
                )}
                <div className="damage-squares-container">
                  Damage:
                  {times(moduleChosen?.damageSlots || 0).map((_d,i) =>
                    <FontAwesomeIcon className="damage-square" key={i} icon={['far', 'square']} />
                  )}
                </div>
              </div>
            </IonItem>
            <IonItem button onClick={() => {setModuleChosen(null); setShowIntroPopover(true);}}>
              Actually, I might build something else
            </IonItem>
            <IonItem button onClick={doModule}>
              Done! Let's get back to it!
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonPopover>
    </div>
  );
}

export default NewModuleControls;
