import upgrade01 from './upgrade01';
import upgrade02 from './upgrade02';
import upgrade03 from './upgrade03';
import upgrade04 from './upgrade04';

import survivor01 from './survivor01';
import survivor02 from './survivor02';
import survivor03 from './survivor03';
import survivor04 from './survivor04';
import survivor05 from './survivor05';
import survivor_final from './survivors-last';
import Level from 'model/Level';

const upgrades: Level[] = [
  upgrade01,
  upgrade02,
  upgrade03,
  upgrade04
]

const survivors: Level[] = [
  survivor01,
  survivor02,
  survivor03,
  survivor04,
  survivor05,
  survivor_final
]

const overrideGame = undefined;

export function upgradeLevel(game: number) : Level {
  game = overrideGame || game;
  return upgrades[(game - 1) % upgrades.length];
}

export function survivorLevel(game: number) : Level {
  game = overrideGame || game;
  return survivors[(game - 1) % survivors.length];
}
