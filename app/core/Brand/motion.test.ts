import { getBrandMotionMode } from './motion';

describe('brand motion capability policy', () => {
  it.each(['LOW', 'MID', 'HIGH', null] as const)(
    'keeps %s hardware offline static',
    (hardware) => {
      const network = 'NONE';

      const mode = getBrandMotionMode(hardware, network, false);

      expect(mode).toBe('static');
    },
  );
  it.each(['LOW', 'MID', 'HIGH', null] as const)(
    'uses product default for %s hardware and unknown network',
    (hardware) => {
      const network = null;

      const mode = getBrandMotionMode(hardware, network, false);

      expect(mode).toBe('default');
    },
  );
  it.each([
    ['LOW', 'WIFI', 'light'],
    ['LOW', 'FAST_CELLULAR', 'light'],
    ['LOW', 'SLOW_CELLULAR', 'light'],
    ['MID', 'SLOW_CELLULAR', 'light'],
    ['HIGH', 'SLOW_CELLULAR', 'light'],
    [null, 'SLOW_CELLULAR', 'light'],
    ['MID', 'WIFI', 'default'],
    [null, 'WIFI', 'default'],
    ['HIGH', 'WIFI', 'full'],
    ['HIGH', 'FAST_CELLULAR', 'full'],
  ] as const)(
    'maps hardware %s network %s to %s',
    (hardware, network, expected) => {
      const reduceMotion = false;

      const mode = getBrandMotionMode(hardware, network, reduceMotion);

      expect(mode).toBe(expected);
    },
  );
  it('gives OS reduced motion precedence over the full experience', () => {
    const reduceMotion = true;

    const mode = getBrandMotionMode('HIGH', 'WIFI', reduceMotion);

    expect(mode).toBe('static');
  });
});
