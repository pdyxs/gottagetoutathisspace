import React, { useState } from "react";

import { IonButton, IonPopover, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonNote } from "@ionic/react";
import { ControlProps } from "../Pieces";
import MarkdownComponent from "components/MarkdownComponent";
import ShipModule from "model/Module";
import { take, shuffle } from "lodash";
import ShipModules from 'data/modules';
import classNames from "classnames";

import IntroContent from 'content/Controls/ModuleIntro.md';
import MakeModuleContent from 'content/Controls/MakeModule.md';
import { CellContentTypes } from "model/Level";

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
            <IonCardTitle>Time to up your... grades?</IonCardTitle>
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
                    {option.basicEffects.map(effect =>
                      <div>{effect}</div>
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
              Ship Moduled!
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <MarkdownComponent
              className="markdown-content"
              source={MakeModuleContent}
              transformations={{moduleName: moduleChosen?.name || ''}} />
            <IonItem color="notebook" class="effectNote note handwritten">
              <div slot="start">
                <span className={classNames("module", `module-${moduleChosen?.type}`)}>{moduleChosen?.name}</span>
              </div>
              <div slot="start" className="full-width">
                {moduleChosen?.basicEffects.map(effect =>
                  <div className="note-content">{effect}</div>
                )}
              </div>
            </IonItem>
            <IonItem button onClick={() => {setModuleChosen(null); setShowIntroPopover(true);}}>
              Actually, I might add something else
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
