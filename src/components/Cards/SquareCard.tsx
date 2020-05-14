import React, { ReactNode } from 'react';

import classNames from 'classnames';

import './SquareCard.scss';

interface SquareCardProps {
  children: ReactNode,
  className?: string
}

const SquareCard: React.FC<SquareCardProps> = ({children, className}) => {
  return (
    <div className={classNames('square-box', className)}>
        <div className='square-content'>
          {children}
        </div>
    </div>
  )
};

export default SquareCard;
