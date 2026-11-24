import type {
  HardwareTier,
  NetworkTier,
} from '../../util/deviceCapability/types';

export type BrandMotionMode = 'static' | 'light' | 'default' | 'full';

/** Unknown transport is product-default, never an inferred offline/LOW cohort. */
export const getBrandMotionMode = (
  hardware: HardwareTier | null,
  network: NetworkTier | null,
  reduceMotion: boolean,
): BrandMotionMode => {
  if (reduceMotion || network === 'NONE') return 'static';
  if (network === null) return 'default';
  if (network === 'SLOW_CELLULAR' || hardware === 'LOW') return 'light';
  return hardware === 'HIGH' ? 'full' : 'default';
};
