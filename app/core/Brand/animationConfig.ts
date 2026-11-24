import brand from '../../../brand/brand.config.json';

/** Retain the upstream implementation for comparison without changing flows. */
export const useLegacyBrandAnimation = brand.animationMode === 'rive';
