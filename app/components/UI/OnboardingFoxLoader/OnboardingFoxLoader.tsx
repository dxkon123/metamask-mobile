import React, { forwardRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { useLegacyBrandAnimation } from '../../../core/Brand/animationConfig';
import { getScreenDimensions } from '../../../util/onboarding';
import { useTheme } from '../../../util/theme';
import BrandMotion from '../BrandMotion/BrandMotion';
import LegacyOnboardingFoxLoader, {
  getOnboardingFoxLoaderBackgroundColor,
  type OnboardingFoxLoaderRef,
} from './LegacyOnboardingFoxLoader';
export { getOnboardingFoxLoaderBackgroundColor } from './LegacyOnboardingFoxLoader';
export type { OnboardingFoxLoaderRef } from './LegacyOnboardingFoxLoader';
const styles = StyleSheet.create({
  wrapper: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
const PetroLoader = forwardRef<OnboardingFoxLoaderRef>((_props, ref) => {
  const { themeAppearance } = useTheme();
  const { screenWidth, animationHeight } = getScreenDimensions();
  return (
    <View
      testID="fox-rive-loader-animation"
      style={[
        styles.wrapper,
        {
          backgroundColor:
            getOnboardingFoxLoaderBackgroundColor(themeAppearance),
        },
      ]}
    >
      <BrandMotion
        ref={ref}
        style={{ width: screenWidth * 0.4, height: animationHeight }}
      />
    </View>
  );
});
PetroLoader.displayName = 'PetroLoader';
const OnboardingFoxLoader = forwardRef<OnboardingFoxLoaderRef>((props, ref) =>
  useLegacyBrandAnimation ? (
    <LegacyOnboardingFoxLoader {...props} ref={ref} />
  ) : (
    <PetroLoader {...props} ref={ref} />
  ),
);
OnboardingFoxLoader.displayName = 'OnboardingFoxLoader';
export default OnboardingFoxLoader;
