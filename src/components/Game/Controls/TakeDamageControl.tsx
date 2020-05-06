import React, { Fragment, useState } from 'react';
import Level from '../../../model/Level';
import { IonButton, IonPopover, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonLabel, IonNote } from '@ionic/react';
import './TakeDamageControl.scss';
import TakeDamageContent from 'content/Controls/TakeDamage.md';
import MarkdownComponent from 'components/MarkdownComponent';
import ShipModule, { ShipModuleDamage } from 'model/Module';
import ShipModules from 'data/modules';
import { filter, find, isNil, without, shuffle, take, first, map, reduce } from 'lodash';

interface TakeDamageControlProps {
  level: Level
  refresh: CallableFunction
}

interface DamageOption {
  module: string,
  damage: ShipModuleDamage
}

const damageOptionCount = 3;

const TakeDamageControl: React.FC<TakeDamageControlProps> = (props) => {
  const [showDamagePopover, setShowDamagePopover] = useState(false);
  const [damageOptions, setDamageOptions] = useState<DamageOption[]>([]);
  let popover = React.useRef<HTMLIonPopoverElement>(null);
  const {level, refresh} = props;

  function setupDamage() {
    var compulsoryModules = filter(ShipModules,
      module => !isNil(find(module.damage, d => d.compulsory)));
    var extraModules = take(shuffle(without(ShipModules, ...compulsoryModules)), damageOptionCount);
    console.log(compulsoryModules);
    console.log(extraModules);

    function getRandomDamage(modules: ShipModule[]) : DamageOption[] {
      return reduce<ShipModule, DamageOption[]>(modules, (acc, m) => {
        var damage = first(shuffle(m.damage));
        if (damage) return [...acc, {
          module: m.name,
          damage
        }];
        return acc;
      }, []);
    }

    setDamageOptions([
      ...getRandomDamage(extraModules),
      ...getRandomDamage(compulsoryModules)
    ]);

    setShowDamagePopover(true);
  }

  return (
    <Fragment>
      <IonButton color="danger" onClick={setupDamage}>
        Take Damage
      </IonButton>
      <IonPopover
        ref={popover}
        isOpen={showDamagePopover}
        backdropDismiss={false}
        cssClass="takeDamagePopover"
        onDidDismiss={() => setShowDamagePopover(false)}>
        <IonCard color="danger">
          <IonCardHeader>
            <IonCardTitle>Brace for impact!</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <MarkdownComponent source={TakeDamageContent} />
            {damageOptions.map(option =>
              <IonItem key={option.module} color="warning">
                <div>
                  <IonLabel>
                    {option.module}: {option.damage.name}
                  </IonLabel>
                  <IonNote className="ion-padding-bottom">
                    {option.damage.effect}
                  </IonNote>
                </div>
              </IonItem>
            )}
            <IonItem button onClick={() => popover.current?.dismiss()}>
              Wait, this is the 'Take Damage' button?
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonPopover>
    </Fragment>
  );
};

export default TakeDamageControl;
