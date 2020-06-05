import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/performance';
import 'firebase/storage';
import 'firebase/functions';
import { ReturnData } from 'model/Phases';

const config = {
  apiKey: "AIzaSyA9pGC2STMiBzpSbNjVxwY-LPYNljeRx6A",
  authDomain: "gotta-get-outta-this-space.firebaseapp.com",
  databaseURL: "https://gotta-get-outta-this-space.firebaseio.com",
  projectId: "gotta-get-outta-this-space",
  storageBucket: "gotta-get-outta-this-space.appspot.com",
  messagingSenderId: "413114238816",
  appId: "1:413114238816:web:884d533fd10d2ec1b0c005",
  measurementId: "G-L3PSLEVPJM"
};

firebase.initializeApp(config);
export const analytics = firebase.analytics();
firebase.performance();

var storage = firebase.storage().ref();
const functions = firebase.functions();

export async function getShipData(id: string, codeName: string) : Promise<ReturnData> {
  const func = functions.httpsCallable('getCurrentData');
  const result = await func({shipCode: id, codeName});
  return result.data;
}

export async function startNewSystem(id: string, codeName: string, systemNumber: number, systemName: string) : Promise<ReturnData> {
  const func = functions.httpsCallable('startNewSystem');
  const result = await func({shipCode: id, codeName, systemNumber, systemName});
  analytics.logEvent(`system-started`, {
    codeName,
    systemNumber,
    gameNumber: (result.data as ReturnData).ship.games.length
  });
  return result.data;
}

export async function registerSystemResult(id: string, codeName: string, systemNumber: number, result: boolean) : Promise<ReturnData> {
  const func = functions.httpsCallable('registerSystemResult');
  const res = await func({shipCode: id, codeName, systemNumber, result});
  analytics.logEvent(`system-${result ? 'won' : 'lost'}`, {
    codeName,
    systemNumber,
    gameNumber: (res.data as ReturnData).ship.games.length
  });
  return res.data;
}

export async function createNewShip(name: string) : Promise<ReturnData> {
  const func = functions.httpsCallable('createShip');
  const result = await func({shipName: name});
  analytics.logEvent(`createShip`, {
    code: (result.data as ReturnData).shipCode
  });
  return result.data;
}

export async function saveGameData(id: string, codeName: string, finalShipURL: string, nextCodename: string) : Promise<ReturnData> {
  const func = functions.httpsCallable('saveGameData');
  const result = await func({shipCode: id, codeName, finalShipURL, nextCodename});
  analytics.logEvent(`game-completed`, {
    code: (result.data as ReturnData).shipCode,
    gameNumber: (result.data as ReturnData).ship.games?.length
  });
  return result.data;
}

export async function uploadFile(shipCode: string, game: number, file: File) : Promise<string> {
  return storage.child(`${shipCode}`).child(`${game}`).child("finalShip").put(file).then((snapshot) => {
    return snapshot.ref.getDownloadURL();
  });
}

//returns: whether it sent or not
export async function sendEmail(captcha: string, from: string, email: string, subject: string, body: string, doSubscribe: boolean) : Promise<any> {
  const func = functions.httpsCallable('sendEmail');
  const resp = await func({from, email, subject, body, doSubscribe, captcha});
  return resp.data;
}
