import { DefaultNavigationProps } from '../../types';
import PrevNextButtons from '../shared/PrevNextButtons';
import React from 'react';
import { ScrollView } from 'react-native';
import { Text } from 'react-native-paper';

interface Props {
  navigation: DefaultNavigationProps<'Home'>;
}

function Page(props: Props): React.ReactElement {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text>Success!</Text>

      <PrevNextButtons
        nextStr={'Finish'}
        prevFunc={(): void => props.navigation.navigate('Preview')}
        nextFunc={(): void => props.navigation.navigate('TripList')}
      />
    </ScrollView>
  );
}

export default Page;
