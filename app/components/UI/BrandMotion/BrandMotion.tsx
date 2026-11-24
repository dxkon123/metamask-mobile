import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {
  AppState,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import mark from '../../../../brand/assets/logo-source.png';
import wallet from '../../../images/onboarding-carousel-1.png';
import success from '../../../images/mm-card-onboarding-success.png';
import brand from '../../../../brand/brand.config.json';
import { getBrandMotionMode } from '../../../core/Brand/motion';
import { useNetworkTier } from '../../../hooks/useNetworkTier';
import { getHardwareTier } from '../../../util/deviceCapability';
import { useReduceMotion } from '../Money/hooks/useReduceMotion';

export interface BrandMotionRef {
  stop: () => void;
}
interface BrandMotionProps {
  variant?: 'mark' | 'wallet' | 'success';
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
const assets = { mark, wallet, success };
const styles = StyleSheet.create({
  frame: {
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artwork: { width: '76%', height: '76%' },
  orbit: {
    position: 'absolute',
    width: '84%',
    height: '52%',
    borderWidth: 2,
    borderRadius: 999,
    borderColor: brand.colors.primary,
    borderLeftColor: brand.colors.primaryLight,
    opacity: 0.3,
  },
});

/** Local decorative motion only. It cannot complete, unlock or advance a flow. */
const BrandMotion = forwardRef<BrandMotionRef, BrandMotionProps>(
  ({ variant = 'mark', style, testID }, ref) => {
    const mode = getBrandMotionMode(
      getHardwareTier(),
      useNetworkTier(),
      useReduceMotion(),
    );
    const [stopped, setStopped] = useState(false);
    const [active, setActive] = useState(
      AppState.currentState !== 'background' &&
        AppState.currentState !== 'inactive',
    );
    const pulse = useSharedValue(1);
    const orbit = useSharedValue(0);
    const stop = useCallback(() => {
      cancelAnimation(pulse);
      cancelAnimation(orbit);
      setStopped(true);
    }, [pulse, orbit]);
    useImperativeHandle(ref, () => ({ stop }), [stop]);
    useEffect(() => {
      const subscription = AppState.addEventListener('change', (state) =>
        setActive(state === 'active'),
      );
      return () => subscription.remove();
    }, []);
    useEffect(() => {
      pulse.value = 1;
      orbit.value = 0;
      if (!stopped && active && mode !== 'static') {
        pulse.value = withRepeat(
          withTiming(mode === 'light' ? 1.015 : 1.04, {
            duration: mode === 'light' ? 2200 : 1600,
            easing: Easing.inOut(Easing.sin),
          }),
          -1,
          true,
        );
        if (mode !== 'light')
          orbit.value = withRepeat(
            withTiming(360, {
              duration: mode === 'full' ? 9000 : 14000,
              easing: Easing.linear,
            }),
            -1,
          );
      }
      return () => {
        cancelAnimation(pulse);
        cancelAnimation(orbit);
      };
    }, [mode, stopped, active, pulse, orbit]);
    const artworkStyle = useAnimatedStyle(() => ({
      transform: [{ scale: pulse.value }],
    }));
    const orbitStyle = useAnimatedStyle(() => ({
      transform: [{ rotate: `${orbit.value}deg` }],
    }));
    return (
      <View
        testID={testID}
        style={[styles.frame, style]}
        pointerEvents="none"
        accessible={false}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        <Animated.View style={[styles.orbit, orbitStyle]} />
        <Animated.Image
          source={assets[variant]}
          resizeMode="contain"
          style={[styles.artwork, artworkStyle]}
          accessible={false}
        />
      </View>
    );
  },
);
BrandMotion.displayName = 'BrandMotion';
export default BrandMotion;
