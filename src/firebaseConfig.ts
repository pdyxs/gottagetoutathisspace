import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/performance';
import 'firebase/storage';
import 'firebase/functions';
import { ShipData, ReturnData } from 'redux/actions';

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
firebase.analytics();
firebase.performance();

var db = firebase.firestore();
var storage = firebase.storage().ref();
const functions = firebase.functions();

export async function getShipData(id: string, codeName: string) : Promise<ReturnData> {
  const func = functions.httpsCallable('getCurrentData');
  const result = await func({shipCode: id, codeName});
  return result.data;
}

export async function checkIfShipExists(id: string) : Promise<boolean> {
  return db.collection("ships").doc(id).get().then(function(doc) {
    return (doc.exists);
  }).catch(function(_e) {
    return false;
  });
}

export async function saveGameData(shipId: string, data: Object) : Promise<void> {
  return db.collection("ships").doc(shipId).collection('games').get().then(snap => {
    db.collection("ships").doc(shipId).collection('games').doc((snap.size + 1).toString()).set(data);
  });
}

export async function createNewShip(name: string) : Promise<ReturnData> {
  const func = functions.httpsCallable('createShip');
  const result = await func({shipName: name});
  return result.data;
}

export async function uploadFile(shipCode: string, game: number, file: File) : Promise<string> {
  return storage.child(`${shipCode}-${game}`).put(file).then((snapshot) => {
    console.log(snapshot);
    return snapshot.ref.getDownloadURL();
  });
}
