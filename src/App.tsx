import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Start from './pages/Start';
import Continue, {baseUrl as continueURL} from './pages/continue';
import NewGame, {baseUrl as newURL} from './pages/new';
import Training, {baseUrl as trainingURL} from './pages/training';
import Game, {baseUrl as gameURL} from './pages/game';

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

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/print" component={Print} />
          <Route path="/start" component={Start} exact={true} />
          <Route path={continueURL} component={Continue} />
          <Route path={newURL} component={NewGame} />
          <Route path={trainingURL} component={Training} />
          <Route path={gameURL} component={Game} />
          <Route exact path="/" render={() => <Redirect to="/start" />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
