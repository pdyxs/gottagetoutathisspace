import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

const shipCodeKey: string = 'shipCode';
const codeNameKey: string = 'codeName';

interface Codes {
  shipCode: string|null; 
  codeName: string;
}

export async function storeCodes(shipCode: string, codeName: string = '') {
  await Storage.set({
    key: shipCodeKey,
    value: shipCode
  });
  await Storage.set({
    key: codeNameKey,
    value: codeName
  })
}

export async function retrieveCodes() : Promise<Codes> {
  let shipCode = await Storage.get({ key: shipCodeKey }).then(v => v.value);
  let codeName = await Storage.get({ key: codeNameKey }).then(v => v.value) || '';
  return { shipCode, codeName };
}

export async function clearCodes() {
  await Storage.remove({ key: shipCodeKey });
  await Storage.remove({ key: codeNameKey });
}
