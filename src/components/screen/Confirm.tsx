import { ScrollView, Text } from 'react-native';
import { DefaultNavigationProps } from '../../types';
import PrevNextButtons from '../shared/PrevNextButtons';
import React from 'react';

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
