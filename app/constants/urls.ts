const MOBILE_UTM = '?utm_source=mobile_app';

// Support
export const METAMASK_SUPPORT_URL = `https://petrocash.org/support`;
export const SRP_GUIDE_URL = `https://petrocash.org/support`;
export const PRIVATE_KEY_GUIDE_URL = `https://petrocash.org/support`;
export const SRP_DOS_AND_DONTS_URL = `https://petrocash.org/support`;
export const IMPORT_WALLET_PRIVATE_KEY_URL = `https://petrocash.org/support`;
export const IMPORT_WALLET_GUIDE_URL = `https://petrocash.org/support`;
export const RESET_PASSWORD_GUIDE_URL = `https://petrocash.org/support`;
export const RESET_PASSWORD_SOCIAL_LOGIN_URL = `https://petrocash.org/support`;
export const PASSWORD_GUIDE_URL = `https://petrocash.org/support`;
export const LEARN_MORE_URL = `https://petrocash.org/support`;
export const WHY_TRANSACTION_TAKE_TIME_URL =
  'https://community.metamask.io/t/what-is-gas-why-do-transactions-take-so-long/3172';
export const SIMULATION_DETALS_ARTICLE_URL = `https://petrocash.org/support`;

export const CONNECTING_TO_A_DECEPTIVE_SITE = `https://petrocash.org/support`;

export const CONNECTING_TO_DEPRECATED_NETWORK = `https://petrocash.org/support`;

export const HOWTO_MANAGE_METAMETRICS = `https://petrocash.org/support`;

// Privacy & Security
export const PROFILE_SYNC_URL = `https://petrocash.org/support`;
export const PRIVACY_BEST_PRACTICES_URL = `https://petrocash.org/support`;
export const SECURITY_ALERTS_URL = `https://petrocash.org/support`;

// Transactions
export const SPEEDUP_CANCEL_TRANSACTION_URL = `https://petrocash.org/support`;
export const SMART_TXS_URL = `https://petrocash.org/support`;
export const HIGH_GAS_FEES_URL = `https://petrocash.org/support`;

// Accounts
export const SMART_ACCOUNTS_URL = `https://petrocash.org/support`;
export const ADD_SOLANA_ACCOUNT_PRIVACY_POLICY_URL = `https://petrocash.org/support`;
export const MULTICHAIN_ACCOUNTS_URL = `https://petrocash.org/support`;

// Tokens & Swaps
export const MUSD_LEARN_MORE_URL = `https://petrocash.org/support`;
export const MONEY_LANDING_URL = `https://metamask.io/money${MOBILE_UTM}`;
export const MONEY_DISCLAIMER_URL = 'https://metamask.io/money#disclaimer';
export const MUSD_PRICE_URL = `https://metamask.io/price/metamask-usd${MOBILE_UTM}`;
export const MISSING_TOKENS_URL = `https://petrocash.org/support`;
export const SWAP_ISSUES_URL = `https://petrocash.org/support`;

// Staking & Earn
export const POOLED_STAKING_FAQ_URL = `https://petrocash.org/support`;
export const TRON_STAKING_FAQ_URL = `https://petrocash.org/support`;
export const LENDING_FAQ_URL = `https://petrocash.org/support`;

// Rewards
export const REWARDS_LEARN_MORE_URL = `https://petrocash.org/support`;

// Builds the priority-support help-center URL for VIP users. Includes a fixed
// `priority=vip` tag so the support-side automation can fast-path the request to a
// human, plus the user's wallet address so that automation can verify enrollment via
// the existing support API (GET /support/subscriptions/check?account=).
// NOTE: `priority=vip` is a placeholder value pending support/Intercom confirmation;
// `address` matches the help-center URL param name expected by support automation.
export const buildVipPrioritySupportUrl = (
  account: string,
  baseUrl: string = METAMASK_SUPPORT_URL,
) => {
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}priority=vip&address=${encodeURIComponent(account)}`;
};

export const buildCardSupportUrl = (
  {
    providerUserId,
    providerName,
  }: {
    providerUserId?: string | null;
    providerName?: string | null;
  },
  baseUrl: string = METAMASK_SUPPORT_URL,
) => {
  const params = [
    ...(providerUserId
      ? [`provider_user_id=${encodeURIComponent(providerUserId)}`]
      : []),
    ...(providerName
      ? [`provider_name=${encodeURIComponent(providerName)}`]
      : []),
  ];

  if (params.length === 0) {
    return baseUrl;
  }

  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}${params.join('&')}`;
};

// Perps
export const PERPS_LEARN_MORE_URL = `https://petrocash.org/support`;
export const PERPS_TROUBLESHOOT_URL = `https://petrocash.org/support`;
export const PERPS_ADL_URL = `https://petrocash.org/support`;

// Troubleshooting
export const CONNECTIVITY_ISSUES_URL = `https://petrocash.org/support`;
export const TOKEN_BALANCE_URL = `https://petrocash.org/support`;
export const TESTNET_ETH_SCAMS_URL = `https://petrocash.org/support`;

// Policies
export const CONSENSYS_PRIVACY_POLICY = 'https://metamask.com/privacy-notice';

// Keystone
export const KEYSTONE_SUPPORT = 'https://keyst.one/mmm';
export const KEYSTONE_LEARN_MORE =
  'https://keyst.one/metamask?rfsn=6088257.656b3e9&utm_source=refersion&utm_medium=affiliate&utm_campaign=6088257.656b3e9';
export const KEYSTONE_SUPPORT_VIDEO = 'https://keyst.one/mmmvideo';

//NGRAVE
export const NGRAVE_LEARN_MORE = 'https://ngrave.io/zero';
export const NGRAVE_BUY = 'https://shop.ngrave.io/';

// Network
export const CHAINLIST_URL = 'https://chainlist.wtf';
export const MM_ETHERSCAN_URL = 'https://etherscamdb.info/domain/meta-mask.com';
export const LINEA_GOERLI_BLOCK_EXPLORER = 'https://goerli.lineascan.build';
export const LINEA_SEPOLIA_BLOCK_EXPLORER = 'https://sepolia.lineascan.build';
export const LINEA_MAINNET_BLOCK_EXPLORER = 'https://lineascan.build';
export const MAINNET_BLOCK_EXPLORER = 'https://etherscan.io';
export const SEPOLIA_BLOCK_EXPLORER = 'https://sepolia.etherscan.io';
export const BASE_MAINNET_BLOCK_EXPLORER = 'https://basescan.org';
export const BSC_MAINNET_BLOCK_EXPLORER = 'https://bscscan.com';

// Phishing
export const MM_PHISH_DETECT_URL =
  'https://github.com/metamask/eth-phishing-detect';
export const MM_BLOCKLIST_ISSUE_URL =
  'https://github.com/metamask/eth-phishing-detect/issues';

export const MM_APP_STORE_LINK =
  'itms-apps://apps.apple.com/app/metamask-blockchain-wallet/id1438144202';

// Canonical base values — imported by AppConstants.ts to avoid duplication
export const MM_UNIVERSAL_LINK_HOST = 'metamask.app.link';
export const MM_ANDROID_BUNDLE_ID = 'io.metamask';

export const MM_PLAY_STORE_LINK = `market://details?id=${MM_ANDROID_BUNDLE_ID}`;

// SDK
export const MM_SDK_DEEPLINK = `https://${MM_UNIVERSAL_LINK_HOST}/connect?`;

// WalletConnect
export const MM_WALLETCONNECT_DEEPLINK = `https://${MM_UNIVERSAL_LINK_HOST}/wc?`;

export const FALSE_POSITIVE_REPORT_BASE_URL =
  'https://blockaid-false-positive-portal.metamask.io';
export const UTM_SOURCE = 'metamask-ppom';

export const SEPOLIA_FAUCET = 'https://www.infura.io/faucet/sepolia';
export const LINEA_FAUCET = 'https://www.infura.io/faucet/linea';

// Add custom network
export const ADD_CUSTOM_NETWORK_ARTCILE = `https://petrocash.org/support`;

export const GOERLI_DEPRECATED_ARTICLE =
  'https://github.com/eth-clients/goerli#goerli-goerlitzer-testnet';

/**
 * Price API origin. Callers append their own `/v3/...` path, the same shape as
 * `TOKEN_API_BASE_URL`.
 */
export const PRICE_API_BASE_URL = 'https://price.api.cx.metamask.io';

export const HOW_TO_MANAGE_METRAMETRICS_SETTINGS = `https://petrocash.org/support`;
export const UNSUPPORTED_BUY_REGION_SUPPORT_URL = `https://petrocash.org/support`;
