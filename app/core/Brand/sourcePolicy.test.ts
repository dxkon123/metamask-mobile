import { isDisplayLiteral, isDisplaySourceFile } from './sourcePolicy';

describe('source branding boundary', () => {
  it.each(['testID', 'key', 'name', 'origin', 'paymentOptions', 'type'])(
    'preserves technical %s values',
    (name) => {
      expect(isDisplayLiteral('property', name, 'MetaMask')).toBe(false);
    },
  );
  it.each(['metamask-sync:', 'metamask', 'MetaMask Tx Signature: rejected'])(
    'preserves protocol constants outside display contexts',
    (text) => expect(isDisplayLiteral('other', undefined, text)).toBe(false),
  );
  it.each([
    'portfolio.metamask.io',
    'https://metamask.io',
    'window.ethereum.isMetaMask = true;',
    'document.body.MetaMask',
  ])('preserves hosts and injected code even under a display key', (text) => {
    expect(isDisplayLiteral('property', 'message', text)).toBe(false);
  });
  it.each(['title', 'description', 'label', 'accessibilityLabel'])(
    'allows visible %s copy',
    (name) =>
      expect(
        isDisplayLiteral('jsxAttribute', name, 'Welcome to MetaMask'),
      ).toBe(true),
  );
  it('allows visible JSX text', () => {
    expect(
      isDisplayLiteral('jsxText', undefined, 'Your MetaMask profile.'),
    ).toBe(true);
  });
  it.each([
    'app/components/UI/Foo/Foo.testIds.ts',
    'app/components/UI/Foo/Foo.perf-test.tsx',
    'app/components/UI/Card/services/DaimoPayService.ts',
    'app/components/Views/confirmations/constants/confirmations.ts',
    'app/components/UI/Charts/webview/chartLogicString.ts',
    'app/components/UI/Foo/hooks/useSiteData.ts',
  ])('excludes technical source %s', (path) => {
    expect(isDisplaySourceFile(path)).toBe(false);
  });
  it('includes ordinary view source', () => {
    expect(
      isDisplaySourceFile(
        'app/components/Views/Settings/AppInformation/index.tsx',
      ),
    ).toBe(true);
  });
});
