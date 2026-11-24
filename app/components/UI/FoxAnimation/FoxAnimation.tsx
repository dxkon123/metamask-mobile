import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useLegacyBrandAnimation } from '../../../core/Brand/animationConfig';
import { useBottomSafeAreaInset } from '../../hooks/useBottomSafeAreaInset';
import BrandMotion from '../BrandMotion/BrandMotion';
import LegacyFoxAnimation, {
  getFoxAnimationHeight,
  getSafeBottomPosition,
} from './LegacyFoxAnimation';
export { getSafeBottomPosition } from './LegacyFoxAnimation';
export type { FoxSafeBottomOptions } from './LegacyFoxAnimation';
interface FoxAnimationProps {
  hasFooter: boolean;
  trigger?: 'Loader' | 'Start';
  fullBleedBottom?: boolean;
}
const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: { width: '100%', height: '100%' },
});
const PetroAnimation = ({
  hasFooter,
  fullBleedBottom = false,
}: FoxAnimationProps) => {
  const bottom = getSafeBottomPosition(hasFooter, useBottomSafeAreaInset(), {
    fullBleedBottom,
  });
  return (
    <View
      pointerEvents="none"
      style={[
        styles.wrapper,
        { bottom, height: getFoxAnimationHeight(hasFooter) },
      ]}
    >
      <BrandMotion testID="fox-animation" style={styles.animation} />
    </View>
  );
};
const FoxAnimation = (props: FoxAnimationProps) =>
  useLegacyBrandAnimation ? (
    <LegacyFoxAnimation {...props} />
  ) : (
    <PetroAnimation {...props} />
  );
export default FoxAnimation;
