import { ReturnData } from "model/Phases";

export const SET_PLAY_DATA = 'SET_PLAY_DATA';
export const SET_CODENAME = 'SET_CODENAME';
export const SET_PLAYER_COUNT = 'SET_PLAYER_COUNT';
export const SET_LOADING = 'SET_LOADING';

export const setCodename = (codename: string) => {
  return { type: SET_CODENAME, payload: {codename} };
}

export const setPlayData = (data: ReturnData) => {
  return { type: SET_PLAY_DATA, payload: {...data} };
}

export const setPlayerCount = (count: number) => {
  return { type: SET_PLAYER_COUNT, payload: {count} };
}

export const clearPlayData = () => {
  return { type: SET_PLAY_DATA, payload: {} };
}

export const setLoading = (isLoading: boolean) => {
  return { type: SET_LOADING, payload: { isLoading } }
}
