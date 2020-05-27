import React, { useEffect, ReactNode, useCallback, createRef } from 'react';
import classNames from 'classnames';

interface SizedInCssProps {
  children: ReactNode;
  className?: string;
}

const refreshRate = 500;
const elementClass = 'sized-in-css';

const SizedInCSS = (props: SizedInCssProps) => {
  const containerRef = createRef<HTMLDivElement>();

  const isClient = typeof window === 'object';

  const doUpdate = useCallback(() => {
    if (containerRef.current)
    {
      containerRef.current.style.setProperty("--element-width", `${containerRef.current.offsetWidth}px`);
      containerRef.current.style.setProperty("--element-height", `${containerRef.current.offsetHeight}px`);
    }
  }, [containerRef]);

  useEffect(() => {
    if (!isClient) {
      return;
    }
    window.addEventListener("resize", doUpdate);
    window.addEventListener("load", doUpdate);
    doUpdate();
    setTimeout(doUpdate, refreshRate/4);
    setTimeout(doUpdate, refreshRate/2);
    setTimeout(doUpdate, 3*refreshRate/4);
    setInterval(doUpdate, refreshRate);
    return () => {
      window.removeEventListener("resize", doUpdate);
      window.removeEventListener("load", doUpdate);
    };
  }, [isClient, doUpdate]);

  return (<div ref={containerRef}
    className={classNames(props.className, elementClass)}>
    {props.children}
  </div>);
};

export default SizedInCSS;
