import { IonLoading, IonPage } from '@ionic/react';
import React, { useState, useEffect, Fragment } from 'react';
import { Route, Redirect, useHistory, Switch } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { retrieveCodes, clearCodes } from '../storage';
import { getShipData } from '../firebaseConfig';
import { setPlayData, clearPlayData } from '../redux/actions';
import { findIndex, take, drop } from 'lodash';
import Header from './Header';

export interface InstructionPageProps {
  baseUrl: string,
  nextUrl: string,
  nextPage: InstructionPageInfo | null,
  pastPages: Array<InstructionPageInfo>,
  futurePages: Array<InstructionPageInfo>,
  resetShip: () => void,
  className?: string,
  extraProps?: any
}

interface InstructionPageInfo {
  url: string,
  requiresShipCode : boolean,
  component: React.FC | React.FC<InstructionPageProps>,
  className?: string,
  extraProps?: any
}

export interface InstructionPagesInfo extends Array<InstructionPageInfo> {}

interface InstructionFlowProps {
  baseUrl: string,
  pages: InstructionPagesInfo,
  nextUrl?: string
}

const InstructionFlow: React.FC<InstructionFlowProps> =
  ({baseUrl, pages, nextUrl}) => {
  const [busy, setBusy] = useState(false);
  const dispatch = useDispatch();

  const history = useHistory();
  const shipCode = useSelector((state: any) => state.shipCode);

  let currentPageIndex = findIndex(pages, page => history.location.pathname === `${baseUrl}/${page.url}`);
  let currentPage = currentPageIndex < 0 ? null : pages[currentPageIndex];
  let nextPage = (currentPageIndex >= pages.length - 1) ? null : pages[currentPageIndex + 1];
  let nextPageUrl = (nextPage ? `${baseUrl}/${nextPage.url}` : nextUrl) || `${baseUrl}/`;

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
      const {shipCode, codeName} = await retrieveCodes();

      if (shipCode) {
        const resultData = await getShipData(shipCode, codeName);
        if (resultData)
        {
          dispatch(setPlayData(resultData));
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
    dispatch(clearPlayData());
    clearCodes();
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
                    extraProps={Page.extraProps || {}}
                    className={Page.className}
                    resetShip={resetShip}
                    baseUrl={baseUrl}
                    nextPage={nextPage}
                    nextUrl={nextPageUrl}
                    pastPages={take(pages, currentPageIndex)}
                    futurePages={drop(pages, currentPageIndex + 1)} />}
                exact={true} />
            )}
            <Redirect push={true} to={`${baseUrl}/${pages[0].url}`} from={baseUrl} />
          </Switch>
        </IonPage>
      }
    </Fragment>

  );
};

export default InstructionFlow;
