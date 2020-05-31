import React, { useEffect, useState } from 'react';
import { IonLoading } from '@ionic/react';

import { useSelector, useDispatch } from 'react-redux';
import { retrieveCodes } from 'storage';
import { getShipData } from 'firebaseConfig';
import { setPlayData, setLoading, setCodename } from 'redux/actions';

const LoadShipIfPossible : React.FC = () => {
  const { shipCode, shipData, isLoading } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    async function checkLocalStorage() {
      if (!shipCode)
      {
        dispatch(setLoading(true));
        const {shipCode, codeName} = await retrieveCodes();

        if (shipCode) {
          const resultData = await getShipData(shipCode, codeName);
          if (resultData)
          {
            dispatch(setPlayData(resultData));
            dispatch(setCodename(codeName));
          }
        }
        dispatch(setLoading(false));
      }
      return;
    }

    if (!shipData && !isLoading && !hasChecked)
    {
      checkLocalStorage();
      setHasChecked(true);
    }
  }, [dispatch, hasChecked, isLoading, shipCode, shipData]);

  return (
    <IonLoading isOpen={isLoading} message="Loading previous game data" />
  );
}

export default LoadShipIfPossible;
