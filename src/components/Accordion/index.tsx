import React, { useState, Fragment } from 'react';
import classnames from 'classnames';
import { IonItemGroup, IonItem } from '@ionic/react';
import Expandable from '../Expandable';
import { isNil } from 'lodash';

interface AccordionProps {
  children: React.ReactElement<AccordionItemProps>[],
  className?: string
}

const Accordion: React.FC<AccordionProps> = ({
  children,
  className,
  ...otherProps
}) => {
  const [currentExpanded, setCurrentExpanded] = useState(0);

  function onChildExpanded(index: number, didExpand: boolean) {
    if (didExpand) setCurrentExpanded(index);
  }

  return (
    <div className={classnames(className, 'accordion')} {...otherProps}>
      {children?.map((child, index) =>
        <Fragment key={index}>
          {React.cloneElement(child, {
            forceExpanded: index === currentExpanded,
            onExpandedChanged: (didExpand: boolean) => onChildExpanded(index, didExpand)
          })}
        </Fragment>
      )}
    </div>
  );
};

interface AccordionItemProps {
  title: string,
  titleClassName?: string,
  className?: string,
  onExpandedChanged?: (didExpand: boolean) => void,
  forceExpanded?: boolean,
  children?: React.ReactNode
}

export const AccordionItem : React.FC<AccordionItemProps> = ({
  title,
  titleClassName,
  className,
  onExpandedChanged,
  forceExpanded,
  children
}) => {
  const [isExpanded, setIsExpanded] = useState(forceExpanded || false);

  function toggleExpanded() {
    var currentlyExpanded = isNil(forceExpanded) ? isExpanded : forceExpanded;
    setIsExpanded(!currentlyExpanded);
    if (onExpandedChanged) {
      onExpandedChanged(!currentlyExpanded);
    }
  }

  const expand = isNil(forceExpanded) ? isExpanded : forceExpanded;

  return (
    <IonItemGroup>
      <IonItem className={classnames('accordion-title', titleClassName)}
        onClick={toggleExpanded}>
        {title}
      </IonItem>
      <Expandable isExpanded={expand} className={classnames(className)}>
        {children}
      </Expandable>
    </IonItemGroup>
  )
};

export default Accordion;
