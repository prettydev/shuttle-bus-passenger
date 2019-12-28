import React, { ReactElement } from 'react';
import { Image } from 'react-native-elements';

const AppLogo = (): ReactElement => (
  <Image
    source={require('assets/imgs/logo.png')}
    style={{ width: 160, height: 160 }}
  />
);

export default AppLogo;
