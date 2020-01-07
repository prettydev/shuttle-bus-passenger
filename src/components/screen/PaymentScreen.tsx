import { Card, Text } from 'react-native-paper';
import { DefaultNavigationProps, User } from '../../types';
import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { useAppContext } from '../../providers/AppProvider';

interface Props {
  navigation: DefaultNavigationProps<'Home'>;
}

function Page(props: Props): React.ReactElement {
  let timer: number;
  const {
    state: { user, booking },
  } = useAppContext();

  return (
    <View>
      <Text>PaymentScreen</Text>
    </View>
  );
}

export default Page;
