import React from 'react';
import './ExploreContainer.css';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import GameGrid from './Game/GameGrid';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <div className="container">
      <GameGrid />
    </div>
  );
};

export default ExploreContainer;
