import React, { useState } from "react";

import { IonButton, IonPopover, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonNote } from "@ionic/react";
import { ControlProps } from "../Pieces";
import MarkdownComponent from "components/MarkdownComponent";
import ShipModule, { ShipModuleUpgrade } from "model/Module";
import { take, shuffle, reduce, first } from "lodash";
import ShipModules from 'data/modules';
import classNames from "classnames";

import IntroContent from 'content/Controls/UpgradeIntro.md';
import MakeUpgradeContent from 'content/Controls/MakeUpgrade.md';
import { CellContentTypes } from "model/Level";

interface UpgradeOption {
  module: ShipModule,
  upgrade: ShipModuleUpgrade
}

const upgradeOptionCount = 4;

const UpgradeControls : React.FC<ControlProps> = ({className, level, coordinates}) => {
  const [showIntroPopover, setShowIntroPopover] = useState(false);
  const [upgradeChosen, setUpgradeChosen] = useState<UpgradeOption | null>(null);
  const [upgradeOptions, setUpgradeOptions] = useState<UpgradeOption[]>([]);

  function setupUpgrade() {
    var modules = take(shuffle(ShipModules), upgradeOptionCount);

    function getRandomUpgrades(modules: ShipModule[]) : UpgradeOption[] {
      return reduce<ShipModule, UpgradeOption[]>(modules, (acc, m) => {
        var upgrade = first(shuffle(m.upgrades));
        if (upgrade) return [...acc, {
          module: m,
          upgrade
        }];
        return acc;
      }, []);
    }

    setUpgradeOptions(getRandomUpgrades(modules));

    setUpgradeChosen(null);

    setShowIntroPopover(true);
  }

  function chooseUpgrade(upgrade: UpgradeOption) {
    setShowIntroPopover(false);
    setUpgradeChosen(upgrade);
  }

  function doUpgrade() {
    level.changeCount(coordinates, CellContentTypes.Upgrade, -1);
    setUpgradeChosen(null);
  }

  return (
    <div slot="end" className={className}>
      <IonButton color="success" size="default" onClick={setupUpgrade}>
        Install
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
            {upgradeOptions.map(option =>
              <IonItem button onClick={() => chooseUpgrade(option)}
                className="popover-card-button-item upgrade-option-item"
                key={option.module.name} color="warning">
                <div slot="start" className="option upgrade-option">
                  <IonLabel>
                    <span className={classNames("module", `module-${option.module.type}`)}>{option.module.name}</span>
                    {option.upgrade.name}
                  </IonLabel>
                  <IonNote className="ion-padding-bottom">
                    {option.upgrade.effect}
                  </IonNote>
                </div>
              </IonItem>
            )}
            <IonItem button onClick={() => setShowIntroPopover(false)}>
              I have none of these modules
            </IonItem>
            <IonItem button onClick={() => setShowIntroPopover(false)}>
              Whoops, I didn't mean to click that
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonPopover>

      <IonPopover isOpen={upgradeChosen !== null}
        backdropDismiss={false}
        cssClass="popoverWithCard"
        onDidDismiss={() => setUpgradeChosen(null)}>
        <IonCard color="success">
          <IonCardHeader>
            <IonCardTitle>
              Ship Upgraded!
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <MarkdownComponent
              className="markdown-content"
              source={MakeUpgradeContent}
              transformations={{moduleName: upgradeChosen?.module.name || ''}} />
            <IonItem color="notebook" class="effectNote note handwritten">
              <div slot="start">
                <span className={classNames("module", `module-${upgradeChosen?.module.type}`)}>{upgradeChosen?.module.name}</span>
              </div>
              <div slot="start" className="full-width">
                <div className="note-heading">
                  {upgradeChosen?.upgrade.name}
                </div>
                <div className="note-content">{upgradeChosen?.upgrade.effect}</div>
              </div>
            </IonItem>
            <IonItem button onClick={() => {setUpgradeChosen(null); setShowIntroPopover(true);}}>
              Actually, I might upgrade something else
            </IonItem>
            <IonItem button onClick={doUpgrade}>
              Done! Let's get back to it!
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonPopover>
    </div>
  );
}

export default UpgradeControls;
