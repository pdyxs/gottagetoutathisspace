import React from 'react';
import Level from '../../model/Level';
import Accordion, { AccordionItem } from '../Accordion';
import TakeActions from 'content/Rules/TakeActions.md';
import RobotsMove from 'content/Rules/RobotsMove.md';
import RobotsAttack from 'content/Rules/RobotsAttack.md';
import Rounds from 'content/Rules/Rounds.md';
import End from 'content/Rules/End.md';
import EnvironmentalEffects from 'content/Rules/EnvironmentalEffects.md';
import { IonItem, IonImg } from '@ionic/react';
import RobotSpread from 'content/Rules/robot-spread.gif';

import './Rules.scss';
import MarkdownComponent from 'components/MarkdownComponent';
import { useSelector } from 'react-redux';
import { StateData } from 'redux/reducer';
import { last } from 'lodash';

interface GameRulesProps {
  level: Level,
  specialInstructions?: string
}

const GameRules: React.FC<GameRulesProps> = ({specialInstructions}) => {
  const {
    shipData
  } = useSelector((state: any) => state) as StateData;

  const transformations = {
    system: last(shipData?.games)?.systems.length || 0
  };

  return (
    <div className="ion-margin-bottom">
      <h2>Rules</h2>
      {specialInstructions &&
        <IonItem color="notebook" className="handwritten">
          <div>
            <MarkdownComponent source={specialInstructions} />
          </div>
        </IonItem>
      }
      <IonItem color="light">
        <div>
          <MarkdownComponent transformations={transformations} className="rules" escapeHtml={false} source={Rounds} />
        </div>
      </IonItem>
      <Accordion>
        <AccordionItem title="1. Take Actions">
          <MarkdownComponent transformations={transformations} escapeHtml={false} className="rules" source={TakeActions} />
        </AccordionItem>
        <AccordionItem title="2. Robots Move">
          <IonImg className="robots-move-img" src={RobotSpread} />
          <MarkdownComponent transformations={transformations} escapeHtml={false} className="rules robots-move strong-em-as-warning-button" source={RobotsMove} />
        </AccordionItem>
        <AccordionItem title="3. Robots Attack">
          <MarkdownComponent transformations={transformations} escapeHtml={false} className="rules strong-em-as-danger-button" source={RobotsAttack} />
        </AccordionItem>
        <AccordionItem title="4. Environmental Effects">
          <MarkdownComponent transformations={transformations} className="rules" escapeHtml={false} source={EnvironmentalEffects} />
        </AccordionItem>
      </Accordion>
      <IonItem color="light">
        <div>
          <MarkdownComponent transformations={transformations} className="rules" escapeHtml={false} source={End} />
        </div>
      </IonItem>
    </div>
  );
};

export default GameRules;
