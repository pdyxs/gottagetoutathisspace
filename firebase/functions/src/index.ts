import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import rp = require('request-promise');

const slackWebhook = functions.config().slack.webhook;

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
    let ret = (i === dashPosition ? '-' : '');
    const ran = randomIntFromInterval(1, 35);
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
  finished: boolean,
  won?: boolean
}

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const createShip = functions.https.onCall(async (data, _) : Promise<ReturnData|undefined> => {
  const {shipName} = data;
  const newID = await getNewShipId();
  const newShipDoc = db.collection("ships").doc(newID);
  const newShipData : ShipData = {
    shipName: shipName,
    created: new Date(),
    games: [{
      created: new Date(),
      systems: []
    }]
  };
  await newShipDoc.set(newShipData);
  const returnData : ReturnData = {
    shipCode: newID,
    ship: newShipData,
    isCurrentPlayer: true
  };
  return returnData;
});

export const getCurrentData = functions.https.onCall(async (data, _) : Promise<ReturnData|undefined> => {
  const {shipCode, codeName} = data;
  const shipDoc = await db.collection("ships").doc(shipCode).get();
  if (!shipDoc.exists) return;

  const shipData : ShipData = shipDoc.data() as ShipData;
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
  const newShipData : ShipData = {
    ...shipData,
    games: []
  };
  if (shipData.games)
  {
    for (let i = 0; i !== shipData.games.length; ++i) {
      newShipData.games.push({
        ...shipData.games[i],
        codeName: undefined
      });
    };
  }
  return newShipData;
}

export const startNewSystem = functions.https.onCall(async (data, _) => {
  const {shipCode, codeName, systemNumber, systemName} = data;
  const shipDoc = db.collection("ships").doc(shipCode);
  const ship = await shipDoc.get();
  if (!ship.exists) return;

  const shipData : ShipData = ship.data() as ShipData;
  const isCurrentPlayer = checkIfCurrentPlayer(shipData, codeName);
  if (isCurrentPlayer) {
    if (!shipData.games || shipData.games.length === 0) {
      shipData.games = [{
        created: new Date(),
        systems: []
      }];
    }

    const game = shipData.games[shipData.games.length - 1];
    //only create this if there's 1 less than the current system
    if (game.systems.length === systemNumber - 1) {
      game.systems.push({
        created: new Date(),
        name: systemName,
        finished: false
      });
    }

    await shipDoc.set(shipData);
  }

  return {
    shipCode,
    ship: sanitiseData(shipData),
    isCurrentPlayer
  }
});

export const registerSystemResult = functions.https.onCall(async (data, _) => {
  const {shipCode, codeName, systemNumber, result} = data;
  const shipDoc = db.collection("ships").doc(shipCode);
  const ship = await shipDoc.get();
  if (!ship.exists) return;

  const shipData : ShipData = ship.data() as ShipData;
  const isCurrentPlayer = checkIfCurrentPlayer(shipData, codeName);
  if (isCurrentPlayer && shipData.games && shipData.games.length > 0) {
    const game = shipData.games[shipData.games.length - 1];
    //only do this if there's the right number of systems
    if (game.systems.length === systemNumber) {
      const system = game.systems[systemNumber - 1];

      system.finished = true;
      system.won = result;

      await shipDoc.set(shipData);
    }
  }

  return {
    shipCode,
    ship: sanitiseData(shipData),
    isCurrentPlayer
  }
});

export const sendEmail = functions.https.onCall((data, _) => {
  const {from, email, subject, body} = data;

  return rp({
    method: 'POST',
    uri: slackWebhook,
    body: {
    	blocks: [
    		{
    			type: "section",
    			text: {
    				"type": "mrkdwn",
    				"text": "Someone has just filled in the *_Gotta Get Outta This Space_* Contact Form!"
    			}
    		},
    		{
    			"type": "divider"
    		},
    		{
    			"type": "section",
    			"text": {
    				"type": "mrkdwn",
    				"text": `*Name:* ${from}\n*Email:* ${email}\n*Subjeect:* ${subject}\n${body}`
    			}
    		},
    		{
    			"type": "actions",
    			"elements": [
    				{
    					"type": "button",
    					"text": {
    						"type": "plain_text",
    						"text": "Reply",
    						"emoji": true
    					},
    					"url": `mailto:${email}?subject=${encodeURIComponent("Re: " + subject)}&body=${encodeURIComponent('\n\n------------------------------\n> ' + body.replace('\n', '\n> '))}`
    				}
    			]
    		}
    	]
    },
    json: true
  });
});

export const saveGameData = functions.https.onCall(async (data, _) => {
  const {shipCode, codeName, finalShipURL, nextCodename} = data;
  const shipDoc = db.collection("ships").doc(shipCode);
  const ship = await shipDoc.get();
  if (!ship.exists) return;

  const shipData : ShipData = ship.data() as ShipData;
  const isCurrentPlayer = checkIfCurrentPlayer(shipData, codeName);
  if (isCurrentPlayer && shipData.games && shipData.games.length > 0) {
    const game = shipData.games[shipData.games.length - 1];
    //only do this if there's the right number of systems
    if (nextCodename.length >= 5 && game.systems.length === 3 && game.systems[2].won) {
      game.finalShipURL = finalShipURL;

      shipData.games.push({
        created: new Date(),
        codeName: nextCodename,
        systems: []
      });

      await shipDoc.set(shipData);
    }
  }

  return {
    shipCode,
    ship: sanitiseData(shipData),
    isCurrentPlayer: false
  }
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
