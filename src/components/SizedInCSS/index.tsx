import React, { useEffect, ReactNode, useCallback, createRef } from 'react';
import classNames from 'classnames';

interface ReactFitTextProps {
  children: ReactNode;
  className?: string;
}

const refreshRate = 500;
const elementClass = 'sized-in-css';

const SizedInCss = (props: ReactFitTextProps) => {
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

export default SizedInCss;
