import React, { createRef } from 'react';
import { AppState } from 'react-native';
import { act, render } from '@testing-library/react-native';
import * as Reanimated from 'react-native-reanimated';
import BrandMotion, { type BrandMotionRef } from './BrandMotion';
import { useNetworkTier } from '../../../hooks/useNetworkTier';
import { useReduceMotion } from '../Money/hooks/useReduceMotion';

jest.mock('react-native-reanimated', () => {
  const actual = jest.requireActual('react-native-reanimated');
  return {
    __esModule: true,
    ...actual,
    default: actual.default,
    withTiming: jest.fn(actual.withTiming),
    cancelAnimation: jest.fn(actual.cancelAnimation),
  };
});

jest.mock('../../../util/deviceCapability', () => ({
  getHardwareTier: () => 'HIGH',
}));
jest.mock('../../../hooks/useNetworkTier', () => ({
  useNetworkTier: jest.fn(() => 'WIFI'),
}));
jest.mock('../Money/hooks/useReduceMotion', () => ({
  useReduceMotion: jest.fn(() => false),
}));

describe('BrandMotion local playback contract', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(useNetworkTier).mockReturnValue('WIFI');
    jest.mocked(useReduceMotion).mockReturnValue(false);
  });
  afterEach(() => jest.restoreAllMocks());

  it('renders a local decorative image at the supplied frame size', () => {
    const style = { width: 150, height: 406 };

    const { getByTestId } = render(
      <BrandMotion testID="brand-motion" style={style} />,
    );

    expect(
      getByTestId('brand-motion', { includeHiddenElements: true }),
    ).toHaveStyle(style);
  });
  it('starts no timing animations when reduced motion is enabled', () => {
    jest.mocked(useReduceMotion).mockReturnValue(true);
    const timing = jest.mocked(Reanimated.withTiming);

    render(<BrandMotion />);

    expect(timing).not.toHaveBeenCalled();
  });
  it('starts no timing animations offline', () => {
    jest.mocked(useNetworkTier).mockReturnValue('NONE');
    const timing = jest.mocked(Reanimated.withTiming);

    render(<BrandMotion />);

    expect(timing).not.toHaveBeenCalled();
  });
  it('keeps stop latched across later network changes', () => {
    const ref = createRef<BrandMotionRef>();
    const timing = jest.mocked(Reanimated.withTiming);
    const { rerender } = render(<BrandMotion ref={ref} />);

    act(() => ref.current?.stop());
    timing.mockClear();
    jest.mocked(useNetworkTier).mockReturnValue('FAST_CELLULAR');
    rerender(<BrandMotion ref={ref} />);

    expect(timing).not.toHaveBeenCalled();
  });
  it('cancels playback when the app enters the background', () => {
    const subscription = jest.spyOn(AppState, 'addEventListener');
    const cancel = jest.mocked(Reanimated.cancelAnimation);
    render(<BrandMotion />);
    const listener = subscription.mock.calls.find(
      ([event]) => event === 'change',
    )?.[1];

    act(() => listener?.('background'));

    expect(cancel).toHaveBeenCalled();
  });
});
