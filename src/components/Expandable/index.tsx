import React, { useState, useLayoutEffect } from 'react';
import classnames from 'classnames';
import { IonItem } from '@ionic/react';
import './Expandable.scss';
import CSS from 'csstype';

interface ExpandableProps {
  children?: React.ReactNode,
  className?: string,
  isExpanded?: boolean,
  style?: CSS.Properties
}

const Expandable: React.FC<ExpandableProps> = ({
  children,
  className,
  isExpanded,
  style,
  ...otherProps
}) => {
  let item = React.useRef<HTMLIonItemElement>(null);
  const [nativeHeight, setNativeHeight] = useState(-1);
  useLayoutEffect(() => {
    setTimeout(() => {
      if (item.current != null) {
        setNativeHeight(item.current.clientHeight);
      }
    }, 1000);
  });

  var computedStyle = {...style};
  if (nativeHeight > 0 || !isExpanded) {
    computedStyle = {
      maxHeight: `${nativeHeight}px`,
      ...style
    }
  }

  return (
    <div className={
      classnames(className, 'expandable', {collapsed: !isExpanded})
    } style={computedStyle} {...otherProps}>
      <IonItem className="expandable-container" ref={item}>
        {children}
      </IonItem>
    </div>
  );
};

export default Expandable;
