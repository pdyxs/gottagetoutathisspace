import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/performance';
import { random } from 'lodash';

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

const codeLength = 7;
const dashPosition = 3;

export function GetRandomShipCode() : string {
  return [...Array(codeLength)].map((_, i) => {
    var ret = (i === dashPosition ? '-' : '');
    var ran = random(1, 35);
    if (ran < 10) ret += ran.toString();
    else ret += String.fromCharCode('A'.charCodeAt(0) + ran - 10);
    return ret;
  }).join('');

}

export async function getShipData(id: string) : Promise<firebase.firestore.DocumentData | null> {
  return db.collection("ships").doc(id).get().then(function(doc) {
    if (!doc.exists) return null;
    return doc.data() || null;
  }).catch(function(error) {
    console.log(`Error reading ship doc ${id}: ${error}`);
    return null;
  });
}

export async function checkIfShipExists(id: string) : Promise<boolean> {
  return db.collection("ships").doc(id).get().then(function(doc) {
    return (doc.exists);
  }).catch(function(_e) {
    return false;
  });
}

export async function saveShipData(id: string, data: Object) : Promise<void> {
  return db.collection("ships").doc(id).set(data);
}
