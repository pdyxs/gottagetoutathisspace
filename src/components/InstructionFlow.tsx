import { IonPage, IonContent } from '@ionic/react';
import React, { useEffect, Fragment, useState } from 'react';
import { Route, useHistory, Switch, Redirect } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { clearCodes } from '../storage';
import { clearPlayData } from '../redux/actions';
import { findIndex, take, drop } from 'lodash';
import Header from './Header';
import { PlayPhase, isAllowedIn } from 'model/Phases';
import { StateData } from 'redux/reducer';
import defaultPage from 'pages/defaults';
import classNames from 'classnames';
import LoadShipIfPossible from './LoadShipIfPossible';

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

interface InstructionFlowPageProps {
  CurrentPage: InstructionPageInfo,
  currentPageIndex: number,
  baseUrl: string,
  pages: InstructionPagesInfo,
  nextUrl?: string
}

const InstructionFlowPage: React.FC<InstructionFlowPageProps> =
  ({CurrentPage, currentPageIndex, baseUrl, pages, nextUrl}) => {
  const dispatch = useDispatch();
  const [checkedUrl, setCheckedUrl] = useState('');

  const history = useHistory();
  const stateData : StateData = useSelector((state: any) => state);
  const shipCode = stateData.shipCode;

  let nextPage = (currentPageIndex >= pages.length - 1) ? null : pages[currentPageIndex + 1];
  let nextPageUrl = (nextPage ? `${baseUrl}/${nextPage.url}` : nextUrl) || `${baseUrl}/`;

  useEffect(() => {
    if (!stateData.isLoading && CurrentPage !== null && checkedUrl !== CurrentPage.url) {
      if (!isAllowedIn(CurrentPage.phase, stateData)) {
        history.replace(defaultPage(stateData));
      } else {
        setCheckedUrl(CurrentPage.url);
      }
    }
  }, [stateData, CurrentPage, checkedUrl, history]);

  function resetShip() {
    dispatch(clearPlayData());
    clearCodes();
  }

  if (!CurrentPage || checkedUrl !== CurrentPage.url) {
    return <></>;
  }

  return (
    <IonPage>
      <LoadShipIfPossible />
      <Header shipCode={shipCode} resetShip={resetShip} />
      <IonContent id="ggots-content" className={classNames("main-content", CurrentPage.className)}>
      <CurrentPage.component
        extraProps={CurrentPage.extraProps || {}}
        className={CurrentPage.className}
        resetShip={resetShip}
        baseUrl={baseUrl}
        nextPage={nextPage}
        nextUrl={nextPageUrl}
        pastPages={take(pages, currentPageIndex)}
        futurePages={drop(pages, currentPageIndex + 1)} />
      </IonContent>
    </IonPage>

  );
};

function InstructionFlow(data: InstructionFlowProps): any {
  const {baseUrl, pages, nextUrl} = data;
  return [
    ...pages.map((page, i) => (
      <Route key={`${baseUrl}/${page.url}`} path={`${baseUrl}/${page.url}`} render={() => (
        <InstructionFlowPage baseUrl={baseUrl} pages={pages} nextUrl={nextUrl}
          CurrentPage={page} currentPageIndex={i} />
      )} />
    )),
    <Route key={`${baseUrl}/`} path={`${baseUrl}/`} render={() => (
      <InstructionFlowPage baseUrl={baseUrl} pages={pages} nextUrl={nextUrl}
        CurrentPage={pages[0]} currentPageIndex={0} />
    )} />
  ];
}

export default InstructionFlow;
