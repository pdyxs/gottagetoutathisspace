import React, { ReactNode } from 'react';

import classNames from 'classnames';

import './SquareCard.scss';

interface SquareCardProps {
  children: ReactNode,
  className?: string,
  style?: React.CSSProperties
}

const SquareCard: React.FC<SquareCardProps> = ({children, className, style}) => {
  return (
    <div className={classNames('square-box', className)} style={style}>
        <div className='square-content'>
          {children}
        </div>
    </div>
  )
};

export default SquareCard;
