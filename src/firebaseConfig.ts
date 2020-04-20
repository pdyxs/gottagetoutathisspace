import firebase from 'firebase';
import 'firebase/firestore';

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

var db = firebase.firestore();

export async function getShipData(id: string) : Promise<firebase.firestore.DocumentData | null> {
  return db.collection("ships").doc(id).get().then(function(doc) {
    if (!doc.exists) return null;
    return doc.data() || null;
  }).catch(function(error) {
    console.log(`Error reading ship doc ${id}: ${error}`);
    return null;
  });
}

export async function saveShipData(id: string, data: Object) : Promise<void> {
  return db.collection("ships").doc(id).set(data);
}
