import { hasConfiguredSegmentKey } from './segmentConfig';

describe('hasConfiguredSegmentKey', () => {
  it.each([undefined, '', ' ', '\t\n'])(
    'disables SDK creation for %p',
    (key) => {
      expect(hasConfiguredSegmentKey(key)).toBe(false);
    },
  );

  it('permits an explicitly configured owner key', () => {
    expect(hasConfiguredSegmentKey('owner-development-test-key')).toBe(true);
  });
});
