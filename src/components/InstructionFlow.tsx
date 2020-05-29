import { IonPage } from '@ionic/react';
import React, { useEffect, Fragment, useState } from 'react';
import { Route, Redirect, useHistory, Switch } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { clearCodes } from '../storage';
import { clearPlayData } from '../redux/actions';
import { findIndex, take, drop } from 'lodash';
import Header from './Header';
import { PlayPhase, isAllowedIn } from 'model/Phases';
import { StateData } from 'redux/reducer';
import defaultPage from 'pages/defaults';

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
  phase : PlayPhase,
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
  const dispatch = useDispatch();
  const [checkedUrl, setCheckedUrl] = useState('');

  const history = useHistory();
  const stateData : StateData = useSelector((state: any) => state);
  const shipCode = stateData.shipCode;

  let currentPageIndex = findIndex(pages, page => history.location.pathname === `${baseUrl}/${page.url}`);
  let currentPage = currentPageIndex < 0 ? null : pages[currentPageIndex];
  let nextPage = (currentPageIndex >= pages.length - 1) ? null : pages[currentPageIndex + 1];
  let nextPageUrl = (nextPage ? `${baseUrl}/${nextPage.url}` : nextUrl) || `${baseUrl}/`;

  useEffect(() => {
    if (!stateData.isLoading && currentPage !== null && checkedUrl !== currentPage.url) {
      if (!isAllowedIn(currentPage.phase, stateData)) {
        history.replace(defaultPage(stateData));
      } else {
        setCheckedUrl(currentPage.url);
      }
    }
  }, [stateData, currentPage, checkedUrl, history]);

  function resetShip() {
    dispatch(clearPlayData());
    clearCodes();
  }

  return (
    <Fragment>
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
    </Fragment>

  );
};

export default InstructionFlow;
