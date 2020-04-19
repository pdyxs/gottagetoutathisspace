import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonPopover, IonRouterOutlet } from '@ionic/react';
import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Intro from './Intro';

const Continue: React.FC = () => {
  return (
    <IonRouterOutlet>
      <Route path="/continue/intro" component={Intro} exact={true} />
      <Route exact path="/continue" render={() => <Redirect to="/continue/intro" />} />
    </IonRouterOutlet>
  );
};

export default Continue;
