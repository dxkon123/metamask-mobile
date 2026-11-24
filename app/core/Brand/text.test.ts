import { rebrandVisibleText } from './text';

describe('rebrandVisibleText', () => {
  it('rebrands visible wallet copy', () => {
    expect(rebrandVisibleText('Welcome to MetaMask', 'PetroCASH')).toBe(
      'Welcome to PetroCASH',
    );
  });
  it('preserves interpolation field names', () => {
    expect(
      rebrandVisibleText('MetaMask %{metamask} {{MetaMask}}', 'PetroCASH'),
    ).toBe('PetroCASH %{metamask} {{MetaMask}}');
  });
  it('preserves markup and API package identifiers', () => {
    expect(
      rebrandVisibleText(
        '<MetaMask>MetaMask</MetaMask> @metamask/providers',
        'PetroCASH',
      ),
    ).toBe('<MetaMask>PetroCASH</MetaMask> @metamask/providers');
  });
  it('does not rewrite service hosts', () => {
    expect(
      rebrandVisibleText('MetaMask https://rpc.metamask.io/path', 'PetroCASH'),
    ).toBe('PetroCASH https://rpc.metamask.io/path');
  });
  it('uses neutral partner product labels', () => {
    expect(
      rebrandVisibleText('MetaMask Card and MetaMask Rewards', 'PetroCASH'),
    ).toBe('Card and Rewards');
  });
  it('keeps the actual mUSD asset identity', () => {
    expect(rebrandVisibleText('MetaMask USD (mUSD)', 'PetroCASH')).toBe('mUSD');
  });
  it('supports another brand without resetting unrelated copy', () => {
    expect(
      rebrandVisibleText(
        'Welcome to PetroCASH. New feature.',
        'FutureWallet',
        'PetroCASH',
      ),
    ).toBe('Welcome to FutureWallet. New feature.');
  });
  it('is idempotent', () => {
    const first = rebrandVisibleText('MetaMask wallet', 'PetroCASH');
    expect(rebrandVisibleText(first, 'PetroCASH')).toBe(first);
  });
});
