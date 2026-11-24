import { normalizeBrandDeeplink } from './deeplink';
import {
  isInternalDeepLink,
  isSDKServiceDeeplink,
} from '../DeeplinkManager/util/deeplinks';

describe('brand custom-scheme alias', () => {
  it('preserves encoded WalletConnect payload bytes', () => {
    const url =
      'petrocash://wc?uri=wc%3Atopic%402%3Frelay-protocol%3Dirn%26symKey%3Dtest';

    const result = normalizeBrandDeeplink(url);

    expect(result).toBe(
      'metamask://wc?uri=wc%3Atopic%402%3Frelay-protocol%3Dirn%26symKey%3Dtest',
    );
  });
  it.each([
    'https://petrocash.org/connect',
    'https://link.metamask.com/connect',
    'https://link-test.metamask.io/wc',
    'petrocash.evil://wc',
    'ethereum:0x123',
  ])('keeps %s unchanged', (url) => {
    const expected = url;

    const result = normalizeBrandDeeplink(url);

    expect(result).toBe(expected);
  });
  it('recognizes the brand WC scheme for SDK initialization gating', () => {
    const url = 'petrocash://wc?uri=wc%3Atest';

    const result = isSDKServiceDeeplink(url);

    expect(result).toBe(true);
  });
  it('keeps the brand scheme inside the wallet router', () => {
    const url = 'petrocash://home';

    const result = isInternalDeepLink(url);

    expect(result).toBe(true);
  });
});
