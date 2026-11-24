import brand from '../../../brand/brand.config.json';

/** Custom-scheme alias only; HTTPS hosts and signed-link origins stay intact. */
export const normalizeBrandDeeplink = (url: string): string => {
  const prefix = `${brand.scheme}://`;
  return url.toLowerCase().startsWith(prefix.toLowerCase())
    ? `metamask://${url.slice(prefix.length)}`
    : url;
};
