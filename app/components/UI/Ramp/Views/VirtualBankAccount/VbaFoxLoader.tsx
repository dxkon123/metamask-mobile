import React from 'react';
import { Box } from '@metamask/design-system-react-native';
import { useLegacyBrandAnimation } from '../../../../../core/Brand/animationConfig';
import { strings } from '../../../../../../locales/i18n';
import BrandMotion from '../../../BrandMotion/BrandMotion';
import LegacyVbaFoxLoader, {
  VbaFoxLoaderSelectorsIDs,
} from './LegacyVbaFoxLoader';
export {
  VbaFoxLoaderSelectorsIDs,
  shouldPlayVbaFoxLoader,
} from './LegacyVbaFoxLoader';
const VbaFoxLoader = ({ testID }: { testID?: string }) =>
  useLegacyBrandAnimation ? (
    <LegacyVbaFoxLoader testID={testID} />
  ) : (
    <Box
      testID={testID}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={strings(
        'virtual_bank_account.loading_accessibility_label',
      )}
    >
      <BrandMotion testID={VbaFoxLoaderSelectorsIDs.ANIMATION} />
    </Box>
  );
export default VbaFoxLoader;
