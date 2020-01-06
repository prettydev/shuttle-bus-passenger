import { AsyncStorage, StatusBar, View } from 'react-native';
import React, { useEffect } from 'react';
import { DefaultRootNavigationProps } from '../../types';
import Loader from '../shared/Loader';
interface Props {
  navigation: DefaultRootNavigationProps<'App'>;
}

type BootstrapAsync = () => Promise<void>;

function Page(props: Props): React.ReactElement {
  const bootstrapAsync: BootstrapAsync = async (): Promise<void> => {
    const userToken = await AsyncStorage.getItem('userToken');
    props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  useEffect(() => {
    bootstrapAsync();
  });

  return (
    <View>
      <Loader />
      <StatusBar barStyle="default" />
    </View>
  );
}

export default Page;
