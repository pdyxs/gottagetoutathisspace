import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

const db = admin.firestore();

// min and max included
function randomIntFromInterval(min: number, max: number) : number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const codeLength = 7;
const dashPosition = 3;

function GetRandomShipCode() : string {
  return [...Array(codeLength)].map((_, i) => {
    var ret = (i === dashPosition ? '-' : '');
    var ran = randomIntFromInterval(1, 35);
    if (ran < 10) ret += ran.toString();
    else ret += String.fromCharCode('A'.charCodeAt(0) + ran - 10);
    return ret;
  }).join('');
}

interface ShipData {
  shipName: string,
  created: Date,
  games: GameData[]
}

interface ReturnData {
  shipCode: string,
  ship: ShipData,
  isCurrentPlayer: boolean
}

interface GameData {
  created: Date,
  codeName?: string,
  systems: SystemData[],
  finalShipURL?: string
}

interface SystemData {
  created: Date,
  name?: string,
  won?: boolean
}

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const createShip = functions.https.onCall(async (data, _) : Promise<ReturnData|undefined> => {
  const {shipName} = data;
  const newID = await getNewShipId();
  let newShipDoc = db.collection("ships").doc(newID);
  let newShipData : ShipData = {
    shipName: shipName,
    created: new Date(),
    games: [{
      created: new Date(),
      systems: []
    }]
  };
  await newShipDoc.set(newShipData);
  let returnData : ReturnData = {
    shipCode: newID,
    ship: newShipData,
    isCurrentPlayer: true
  };
  return returnData;
});

export const getCurrentData = functions.https.onCall(async (data, _) : Promise<ReturnData|undefined> => {
  const {shipCode, codeName} = data;
  let shipDoc = await db.collection("ships").doc(shipCode).get();
  if (!shipDoc.exists) return;

  var shipData : ShipData = shipDoc.data() as ShipData;
  const isCurrentPlayer = checkIfCurrentPlayer(shipData, codeName);

  return {
    shipCode,
    ship: sanitiseData(shipData),
    isCurrentPlayer
  }
});

function checkIfCurrentPlayer(shipData: ShipData, codeName: string) : boolean {
  if (!shipData.games || shipData.games.length <= 1) {
    return true;
  }
  //check codename
  return (codeName === shipData.games[shipData.games.length - 1].codeName);
}

function sanitiseData(shipData: ShipData) : ShipData {
  let newShipData : ShipData = {
    ...shipData,
    games: []
  };
  if (shipData.games)
  {
    for (var i = 0; i !== shipData.games.length; ++i) {
      newShipData.games.push({
        ...newShipData.games[i],
        codeName: undefined
      });
    };
  }
  return newShipData;
}

export const uploadImage = functions.https.onCall(async (data, _) => {
  return data.file;
});

async function getNewShipId() : Promise<string> {
  const testShipCode = GetRandomShipCode();
  const exists = await checkIfShipExists(testShipCode);
  if (exists) {
    return getNewShipId();
  }
  return testShipCode;
}

async function checkIfShipExists(id: string) : Promise<boolean> {
  return db.collection("ships").doc(id).get().then(function(doc) {
    return (doc.exists);
  }).catch(function(_e) {
    return false;
  });
}
