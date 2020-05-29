import { StateData } from "redux/reducer";

import { baseUrl as gameAStartUrl, gameUrl as gameAUrl } from "pages/game-fuel";
import { baseUrl as gameBStartUrl, gameUrl as gameBUrl } from "pages/game-upgrade";
import { baseUrl as gameCStartUrl, gameUrl as gameCUrl } from "pages/game-survivor";
import { baseUrl as postGameUrl } from "pages/end";
import { materialsURL } from "pages/continue";

const checkupURL = "/";

function defaultPage(data: StateData) : string {
  //If no code or data
  if (!data.shipData || !data.shipCode || data.shipData.games.length < 1) {
    return "/";
  }

  //If it's an older player
  if (!data.isCurrentPlayer) {
    return checkupURL;
  }

  let game = data.shipData.games[data.shipData.games.length - 1];
  if (!game.systems || game.systems.length === 0) {
    if (data.shipData.games.length === 1) { //first game
      return materialsURL;
    }
    return gameAStartUrl;
  }

  if (game.systems.length === 1) {
    if (!game.systems[0].finished) {
      return gameAUrl;
    } else if (game.systems[0].won) {
      return gameBStartUrl;
    } else {
      return checkupURL;
    }
  }

  if (game.systems.length === 2) {
    if (!game.systems[1].finished) {
      return gameBUrl;
    } else if (game.systems[1].won) {
      return gameCStartUrl;
    } else {
      return checkupURL;
    }
  }

  if (!game.systems[2].finished) {
    return gameCUrl;
  } else if (game.systems[2].won) {
    return postGameUrl;
  } else {
    return checkupURL;
  }
}

export default defaultPage;
