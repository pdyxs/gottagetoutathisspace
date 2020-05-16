import React from 'react';
import './Start.scss';
import modules from 'data/modules';
import slugify from 'slugify';
import ShipCard from 'components/Game/GameElements/ShipCard';
import './Print.scss';

const Print: React.FC = () => {
  return (
    <div className="printable print-page">
      {modules.map(module => (
        <ShipCard key={slugify(module.name)} className="default-square" module={module}>
        </ShipCard>
      ))}
    </div>
  );
};

export default Print;
