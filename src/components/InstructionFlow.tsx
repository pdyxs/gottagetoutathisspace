import { IonLoading, IonPage } from '@ionic/react';
import React, { useState, useEffect, Fragment } from 'react';
import { Route, Redirect, useHistory, Switch } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { retrieveShipCode, clearShipCode } from '../storage';
import { getShipData } from '../firebaseConfig';
import { setShipData, ShipData, clearShipData } from '../redux/actions';
import { findIndex, take, drop } from 'lodash';
import Header from './Header';

export interface InstructionPageProps {
  baseUrl: string,
  nextUrl: string,
  nextPage: InstructionPageInfo | null,
  pastPages: Array<InstructionPageInfo>,
  futurePages: Array<InstructionPageInfo>,
  resetShip: () => void
}

interface InstructionPageInfo {
  url: string,
  requiresShipCode : boolean,
  component: React.FC | React.FC<InstructionPageProps>
}

export interface InstructionPagesInfo extends Array<InstructionPageInfo> {}

interface InstructionFlowProps {
  baseUrl: string,
  pages: InstructionPagesInfo
}

const InstructionFlow: React.FC<InstructionFlowProps> =
  ({baseUrl, pages}) => {
  const [busy, setBusy] = useState(false);
  const dispatch = useDispatch();

  const history = useHistory();
  const shipCode = useSelector((state: any) => state.shipCode);

  let currentPageIndex = findIndex(pages, page => history.location.pathname === `${baseUrl}/${page.url}`);
  let currentPage = currentPageIndex < 0 ? null : pages[currentPageIndex];
  let nextPage = (currentPageIndex >= pages.length - 1) ? null : pages[currentPageIndex + 1];
  let nextUrl = `${baseUrl}/${nextPage?.url}`;

  function gotoPageWithoutShipCode() {
    if (!pages[0].requiresShipCode) {
      history.replace(`${baseUrl}/${pages[0].url}`);
    } else {
      history.replace(`/start`);
    }
  }

  async function checkLocalStorage() {
    if (!shipCode && currentPage != null)
    {
      const code = await retrieveShipCode();

      if (code) {
        const shipData = await getShipData(code);
        if (shipData)
        {
          dispatch(setShipData(code, shipData as ShipData));
        } else if (currentPage.requiresShipCode) {
          gotoPageWithoutShipCode();
        }
      } else if (currentPage.requiresShipCode) {
        gotoPageWithoutShipCode();
      }
      setBusy(false);
    }
    return;
  }

  if (!busy && !shipCode && currentPage !== null && currentPage.requiresShipCode) {
    setBusy(true);
  }

  useEffect(() => {
    checkLocalStorage();
  });

  function resetShip() {
    dispatch(clearShipData());
    clearShipCode();
  }

  return (
    <Fragment>
      {busy &&
        <IonLoading isOpen={busy} message="Loading previous code" />
      }
      {!busy &&
        <IonPage>
          <Header shipCode={shipCode} resetShip={resetShip} />

          <Switch>
            {pages.map(Page =>
              <Route key={Page.url} path={`${baseUrl}/${Page.url}`}
                render={(props) =>
                  <Page.component {...props}
                    resetShip={resetShip}
                    baseUrl={baseUrl}
                    nextPage={nextPage}
                    nextUrl={nextUrl}
                    pastPages={take(pages, currentPageIndex)}
                    futurePages={drop(pages, currentPageIndex + 1)} />}
                exact={true} />
            )}
            <Route exact path={baseUrl} render={() => <Redirect to={`${baseUrl}/${pages[0].url}`} />} />
          </Switch>
        </IonPage>
      }
    </Fragment>

  );
};

export default InstructionFlow;
