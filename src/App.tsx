import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonLoading } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Start from './pages/Start';
import Continue, {baseUrl as continueURL} from './pages/continue';
import NewGame, {baseUrl as newURL} from './pages/new';
import GameFuel, {baseUrl as gameFuelURL} from './pages/game-fuel';
import GameUpgrade, {baseUrl as gameUpgradeURL} from './pages/game-upgrade';
import GameSurvivor, {baseUrl as gameSurvivorURL} from './pages/game-survivor';
import EndGame, {baseUrl as endURL} from './pages/end';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/fonts.css';
import './theme/variables.css';
import './theme/variables.scss';
import './theme/print.scss';

import Print from 'pages/Print';
import Make from 'pages/Make';

import { useSelector, useDispatch } from 'react-redux';
import { retrieveCodes } from 'storage';
import { getShipData } from 'firebaseConfig';
import { setPlayData } from 'redux/actions';

const App: React.FC = () => {
  const [busy, setBusy] = useState(false);
  const { shipCode, shipData } = useSelector((state: any) => state);
  const dispatch = useDispatch();

  async function checkLocalStorage() {
    if (!shipCode)
    {
      const {shipCode, codeName} = await retrieveCodes();

      if (shipCode) {
        setBusy(true);
        const resultData = await getShipData(shipCode, codeName);
        if (resultData)
        {
          dispatch(setPlayData(resultData));
        }
      }
      setBusy(false);
    }
    return;
  }

  useEffect(() => {
    if (!shipData)
      checkLocalStorage();
  });

  return (
    <IonApp>
      {busy &&
        <IonLoading isOpen={busy} message="Loading previous code" />
      }
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/print" component={Print} />
          <Route path="/make" component={Make} />
          <Route path="/start" component={Start} exact={true} />
          <Route path={continueURL} component={Continue} />
          <Route path={newURL} component={NewGame} />
          <Route path={endURL} component={EndGame} />
          <Route path={gameFuelURL} component={GameFuel} />
          <Route path={gameUpgradeURL} component={GameUpgrade} />
          <Route path={gameSurvivorURL} component={GameSurvivor} />
          <Route exact path="/" render={() => <Redirect to="/start" />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
