import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

const shipCodeKey: string = 'shipCode';

export async function storeShipCode(code: string) {
  return Storage.set({
    key: shipCodeKey,
    value: code
  });
}

export async function retrieveShipCode() {
  return await Storage.get({ key: shipCodeKey }).then(v => v.value);
}

export async function clearShipCode() {
  return await Storage.remove({ key: shipCodeKey });
}
