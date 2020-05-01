import React from 'react';
import Level from '../../model/Level';
import Accordion, { AccordionItem } from '../Accordion';
import TakeActions from './TakeActions.md';
import ReactMarkdown from 'react-markdown';

interface GameRulesProps {
  level: Level
}

const GameRules: React.FC<GameRulesProps> = () => {
  return (
    <div>
      <Accordion>
        <AccordionItem title="1. Take Actions">
          <ReactMarkdown source={TakeActions} />
        </AccordionItem>
        <AccordionItem title="2. Robots Move">
          <ReactMarkdown source={TakeActions} />
        </AccordionItem>
        <AccordionItem title="3. Robots Attack">
          <ReactMarkdown source={TakeActions} />
        </AccordionItem>
        <AccordionItem title="4. Environmental Effects">
          <ReactMarkdown source={TakeActions} />
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default GameRules;
