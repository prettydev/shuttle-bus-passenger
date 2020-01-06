import React, { ReactElement, memo } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { theme } from '../core/theme';

const Page = (): ReactElement => (
  <ActivityIndicator
    animating
    size="large"
    style={{ alignItems: 'center' }}
    color={theme.colors.icon}
  />
);

export default memo(Page);
