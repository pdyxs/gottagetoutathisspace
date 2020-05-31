import React, { Fragment, useState, useEffect } from 'react';
import { IonButton, IonPopover, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonNote } from '@ionic/react';
import './TakeDamageControl.scss';
import TakeDamageIntroContent from 'content/Controls/TakeDamageIntro.md';
import TakeDamageInstructionContent from 'content/Controls/TakeDamageInstructions.md';
import TakeDamageDestroyModuleContent from 'content/Controls/TakeDamageDestroyModule.md';
import TakeDamageLoseCrewContent from 'content/Controls/TakeDamageLoseCrew.md';

import MarkdownComponent from 'components/MarkdownComponent';
import ShipModule, { ShipModuleDamage } from 'model/Module';
import ShipModules from 'data/modules';
import { filter, find, isNil, without, shuffle, take, first, reduce } from 'lodash';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface TakeDamageControlProps {
}

interface DamageOption {
  module: ShipModule,
  damage: ShipModuleDamage
}

const damageOptionCount = 2;

const TakeDamageControl: React.FC<TakeDamageControlProps> = () => {
  const [showDamagePopover, setShowDamagePopover] = useState(false);
  const [damageChosen, setDamageChosen] = useState<DamageOption | null>(null);
  const [crewDamageChosen, setCrewDamageChosen] = useState(false);
  const [damageOptions, setDamageOptions] = useState<DamageOption[]>([]);

  useEffect(() => {
    var compulsoryModules = filter(ShipModules,
      module => !isNil(find(module.damage, d => d.compulsory)));

    var extraModules = take(shuffle(without(ShipModules, ...compulsoryModules)), damageOptionCount);
    setDamageOptions([
      ...getRandomDamage(extraModules),
      ...getRandomDamage(compulsoryModules)
    ]);
  }, [])

  function getRandomDamage(modules: ShipModule[]) : DamageOption[] {
    return reduce<ShipModule, DamageOption[]>(modules, (acc, m) => {
      var damage = first(shuffle(m.damage));
      if (damage) return [...acc, {
        module: m,
        damage
      }];
      return acc;
    }, []);
  }

  function setupDamage() {
    setDamageChosen(null);
    setCrewDamageChosen(false);

    setShowDamagePopover(true);
  }

  function randomiseModules() {
    var compulsoryModules = filter(ShipModules,
      module => !isNil(find(module.damage, d => d.compulsory)));

    var extraModules = take(shuffle(without(ShipModules, ...compulsoryModules)), damageOptionCount);
    setDamageOptions([
      ...getRandomDamage(extraModules),
      ...getRandomDamage(compulsoryModules)
    ]);
  }

  function chooseDamage(damage: DamageOption|"crew"|null) {
    setShowDamagePopover(false);
    if (damage === "crew") {
      setCrewDamageChosen(true);
    } else {
      setDamageChosen(damage);
    }

    randomiseModules();
  }

  return (
    <Fragment>
      <IonButton color="danger" onClick={setupDamage}>
        Take Damage
      </IonButton>
      <IonPopover
        isOpen={showDamagePopover}
        backdropDismiss={false}
        cssClass="takeDamagePopover"
        onDidDismiss={() => setShowDamagePopover(false)}>
        <IonCard color="danger">
          <IonCardHeader>
            <IonCardTitle>Brace for impact!</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <MarkdownComponent className="markdown-content" source={TakeDamageIntroContent} />
            {damageOptions.map(option =>
              <IonItem button onClick={() => chooseDamage(option)}
                key={option.module.name} color="warning"
                className="damage-option-item popover-card-button-item">
                <div slot="start" className="damage-option-icon">
                  <FontAwesomeIcon icon={option.damage.icon || ['fas', 'square']} />
                </div>
                <div slot="start" className="option damage-option">
                  <IonLabel>
                    <span className={classNames("module", `module-${option.module.type}`)}>{option.module.name}</span>
                    {option.damage.name}
                  </IonLabel>
                  <IonNote className="ion-padding-bottom">
                    {option.damage.effect}
                  </IonNote>
                </div>
              </IonItem>
            )}
            <IonItem button onClick={() => chooseDamage("crew")}
              color="warning" className="damage-option-item popover-card-button-item">
              <div slot="start" className="damage-option-icon">
                <FontAwesomeIcon icon={['fas', 'skull-crossbones']} />
              </div>
              <div slot="start" className="option damage-option">
                <IonLabel>
                  Lose Crew
                </IonLabel>
                <IonNote className="ion-padding-bottom">
                  One of your crew dies
                </IonNote>
              </div>
            </IonItem>
            <IonItem button onClick={() => {randomiseModules(); setShowDamagePopover(false);}}>
              I have none of these modules, and no crew
            </IonItem>
            <IonItem button onClick={() => setShowDamagePopover(false)}>
              Wait, this is the 'Take Damage' button?
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonPopover>

      <IonPopover isOpen={damageChosen !== null}
        backdropDismiss={false}
        cssClass="takeDamagePopover"
        onDidDismiss={() => setDamageChosen(null)}>
        <IonCard color="danger" className="damageInstructionsCard">
          <IonCardHeader>
            <IonCardTitle>
              Damage Taken!
              <div className="damage-option-icon">
                <FontAwesomeIcon icon={damageChosen?.damage.icon || ['fas', 'square']} />
              </div>
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <MarkdownComponent
              className="markdown-content"
              source={TakeDamageInstructionContent}
              transformations={{moduleName: damageChosen?.module.name || ''}} />
            <ol>
              <li>
                <p>Fill in the damage slot</p>
                <blockquote>Draw in the damage icon (above) into a free damage slot on the {damageChosen?.module.name || ''} module</blockquote>
              </li>
              {damageChosen?.damage.immediateInstructions &&
                <li>
                  <p>Immediate Effects</p>
                  <blockquote>{damageChosen.damage.immediateInstructions}</blockquote>
                </li>
              }
              {damageChosen?.damage.longTermInstructions &&
                <li>
                  <p>Long term Effects</p>
                  <blockquote>Check if the back of your module has instructions for this damage icon. If not, write the effect (below) on the back, including the icon</blockquote>
                </li>
              }
            </ol>
            {damageChosen?.damage.longTermInstructions &&
              <IonItem color="notebook" class="effectNote note handwritten">
                <div slot="start" className="damage-option-icon">
                  <FontAwesomeIcon icon={damageChosen?.damage.icon || ['fas', 'square']} />
                </div>
                <div slot="start">
                  <div className="damageEffect note-heading">{damageChosen?.damage.name}</div>
                  <div className="damageDetail note-content">{damageChosen?.damage.longTermInstructions}</div>
                </div>
              </IonItem>
            }
            <MarkdownComponent className="markdown-content" source={TakeDamageDestroyModuleContent} />
            {damageChosen?.damage.canLoseCrew &&
              <IonItem button color="warning" onClick={() => {setDamageChosen(null); setCrewDamageChosen(true);}}>
                One of my crew died
              </IonItem>
            }
            <IonItem button color="warning" onClick={setupDamage}>
              I took more damage
            </IonItem>
            <IonItem button onClick={() => {setDamageChosen(null); setCrewDamageChosen(false);}}>
              Let's get back to the fight!
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonPopover>

      <IonPopover isOpen={crewDamageChosen}
        backdropDismiss={false}
        cssClass="takeDamagePopover"
        onDidDismiss={() => setDamageChosen(null)}>
        <IonCard color="danger" className="damageInstructionsCard">
          <IonCardHeader>
            <IonCardTitle>
              Crew member killed!
              <div className="damage-option-icon">
                <FontAwesomeIcon icon={['fas', 'skull-crossbones']} />
              </div>
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <MarkdownComponent className="markdown-content" source={TakeDamageLoseCrewContent} />
            <IonItem button color="warning" onClick={setupDamage}>
              I took more damage
            </IonItem>
            <IonItem button onClick={() => {setDamageChosen(null); setCrewDamageChosen(false);}}>
              Let's get back to the fight!
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonPopover>
    </Fragment>
  );
};

export default TakeDamageControl;
