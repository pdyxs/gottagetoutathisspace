import React from 'react';
import Level from '../../model/Level';
import Accordion, { AccordionItem } from '../Accordion';
import TakeActions from 'content/Rules/TakeActions.md';
import RobotsMove from 'content/Rules/RobotsMove.md';
import RobotsAttack from 'content/Rules/RobotsAttack.md';
import Rounds from 'content/Rules/Rounds.md';
import EnvironmentalEffects from 'content/Rules/EnvironmentalEffects.md';
import ReactMarkdown from 'react-markdown';
import { IonItem } from '@ionic/react';

import './Rules.scss';

interface GameRulesProps {
  level: Level,
  specialInstructions?: string
}

const GameRules: React.FC<GameRulesProps> = ({specialInstructions}) => {
  return (
    <div>
      <h2>Rules</h2>
      <IonItem color="dark">
        <div>
          <ReactMarkdown source={Rounds} />
        </div>
      </IonItem>
      {specialInstructions &&
        <IonItem color="notebook" className="handwritten">
          <div>
            <ReactMarkdown source={specialInstructions} />
          </div>
        </IonItem>
      }
      <Accordion>
        <AccordionItem title="1. Take Actions">
          <ReactMarkdown className="strong-em-as-success-button" source={TakeActions} />
        </AccordionItem>
        <AccordionItem title="2. Robots Move">
          <ReactMarkdown className="robots-move strong-em-as-warning-button" source={RobotsMove} />
        </AccordionItem>
        <AccordionItem title="3. Robots Attack">
          <ReactMarkdown className="strong-em-as-danger-button" source={RobotsAttack} />
        </AccordionItem>
        <AccordionItem title="4. Environmental Effects">
          <ReactMarkdown source={EnvironmentalEffects} />
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default GameRules;
