import React from 'react';
import Level from '../../model/Level';
import Accordion, { AccordionItem } from '../Accordion';
import TakeActions from './TakeActions.md';
import RobotsMove from './RobotsMove.md';
import RobotsAttack from './RobotsAttack.md';
import Rounds from './Rounds.md';
import EnvironmentalEffects from './EnvironmentalEffects.md';
import ReactMarkdown from 'react-markdown';
import { IonItem } from '@ionic/react';

interface GameRulesProps {
  level: Level
}

const GameRules: React.FC<GameRulesProps> = () => {
  return (
    <div>
      <h2>Rules</h2>
      <IonItem color="dark">
        <div>
          <ReactMarkdown source={Rounds} />
        </div>
      </IonItem>
      <Accordion>
        <AccordionItem title="1. Take Actions">
          <ReactMarkdown source={TakeActions} />
        </AccordionItem>
        <AccordionItem title="2. Robots Move">
          <ReactMarkdown source={RobotsMove} />
        </AccordionItem>
        <AccordionItem title="3. Robots Attack">
          <ReactMarkdown source={RobotsAttack} />
        </AccordionItem>
        <AccordionItem title="4. Environmental Effects">
          <ReactMarkdown source={EnvironmentalEffects} />
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default GameRules;
