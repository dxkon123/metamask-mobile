import type { Theme as TokenTheme } from '@metamask/design-tokens';
import { getThemeColors, Theme } from '@metamask/design-system-twrnc-preset';
import brand from '../../../brand/brand.config.json';

export const withBrandColors = (
  colors: TokenTheme['colors'],
  dark: boolean,
): TokenTheme['colors'] => ({
  ...colors,
  primary: {
    ...colors.primary,
    default: dark ? brand.colors.primaryOnDark : brand.colors.primaryOnLight,
    alternative: dark
      ? brand.colors.primaryOnDark
      : brand.colors.primaryOnLight,
    muted: dark
      ? brand.colors.primaryMutedDark
      : brand.colors.primaryMutedLight,
  },
});

/** Public preset configuration objects are read at provider construction. */
export const configureDesignSystemBrand = (): void => {
  for (const [theme, primary, muted] of [
    [Theme.Light, brand.colors.primaryOnLight, brand.colors.primaryMutedLight],
    [Theme.Dark, brand.colors.primaryOnDark, brand.colors.primaryMutedDark],
  ] as const) {
    const colors = getThemeColors?.(theme);
    if (colors)
      Object.assign(colors, {
        'primary-default': primary,
        'primary-alternative': primary,
        'primary-muted': muted,
      });
  }
};
