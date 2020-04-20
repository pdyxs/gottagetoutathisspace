import { IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol } from '@ionic/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { ShipData } from '../../redux/actions';

const materials = [
  {
    count: 16,
    name: "Space Cards",
    explanation: "These are used to make the map that you'll play on",
    notes: (d : ShipData) => d.spaceCards
  },
  {
    count: "5-10",
    name: "Ship Module Cards",
    explanation: "These modules come together to make your ship. Each affects what you can do or what your ship can contain in some way.",
    notes: (d : ShipData) => d.shipCards
  },
  {
    count: "1 or more",
    name: "Crew Cards",
    explanation: "Your crew. Each comes with an ability that can be used once per game",
    notes: (d : ShipData) => d.crewCards
  },

  {
    count: 20,
    name: "Robot Tokens",
    explanation: "The robots that are coming to destroy you",
    notes: (d : ShipData) => d.robotTokens
  },
  {
    count: 1,
    name: "Ship Token",
    explanation: "The representation of your ship on the map",
    notes: (d : ShipData) => d.shipToken
  },
  {
    count: 1,
    name: "Survivor Token",
    explanation: "A survivor who you might be able to rescue",
    notes: (d : ShipData) => d.survivorToken
  },
  {
    count: 1,
    name: "Upgrade Token",
    explanation: "An upgrade for one of your ship's modules that you might be able to collect",
    notes: (d : ShipData) => d.upgradeToken
  },
  {
    count: 1,
    name: "New Module Token",
    explanation: "A new module you might be able to pick up",
    notes: (d : ShipData) => d.newModuleToken
  },
  {
    count: "Maybe some",
    name: "Fuel Tokens",
    explanation: "Fuel that you have, or can collect. You might not have any.",
    notes: (d : ShipData) => d.fuelTokens
  },
  {
    count: "Maybe some",
    name: "Damage Dice",
    explanation: "Dice that are used to determine the effects of damage on your modules. If you don't have any, your modules are probably fine!",
    notes: (d : ShipData) => d.damageDice
  }
];

const Materials: React.FC = () => {
  const shipData = useSelector((state: any) => state.shipData);

  return (
    <IonContent>
      <div className="ion-text-center">
        <h2>Materials</h2>
        <p>
          This is what you should find in your envelope. As
          your components have been created by past captains, they will be
          unique. Past captains have left notes about what
          you'll find.
        </p>
        <IonGrid>
          <IonRow>
            {materials.map((material, i) =>
              <IonCol key={i} size="6" size-md="4" size-lg="3">
                <IonCard>
                  <IonCardHeader>
                    <IonCardSubtitle>{material.count}</IonCardSubtitle>
                    <IonCardTitle>{material.name}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>{material.notes(shipData)}</p>
                    <p>{material.explanation}</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            )}
          </IonRow>
        </IonGrid>
      </div>
    </IonContent>
  );
};

export default Materials;
