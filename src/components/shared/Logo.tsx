import { Image, StyleSheet } from 'react-native';
import React, { ReactElement, memo } from 'react';

const styles = StyleSheet.create({
  image: {
    width: 128,
    height: 128,
    marginBottom: 12,
  },
});

const Logo = (): ReactElement => (
  <Image source={require('../assets/bus.png')} style={styles.image} />
);

export default memo(Logo);
