import { Image, StyleSheet } from 'react-native';
import React, { ReactElement, memo } from 'react';
import { IconButton } from 'react-native-paper';
import { theme } from '../core/theme';

const styles = StyleSheet.create({
  image: {
    width: 128,
    height: 128,
    marginBottom: 12,
  },
});

const Logo = (): ReactElement => (
  // <Image source={require('../assets/bus.png')} style={styles.image} />
  <IconButton icon="bus" color={theme.colors.icon} size={100} />
);

export default memo(Logo);
