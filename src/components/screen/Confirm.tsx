import { Card, Text } from 'react-native-paper';
import { DefaultBookingNavigationProps } from '../../types';
import PrevNextButtons from '../shared/PrevNextButtons';
import React from 'react';
import { ScrollView } from 'react-native';

interface Props {
  navigation: DefaultBookingNavigationProps<'TripList'>;
}

function Page(props: Props): React.ReactElement {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Card
        style={{
          padding: 25,
          margin: 5,
          justifyContent: 'center',
        }}
      >
        <Text>Success!</Text>
      </Card>
      <PrevNextButtons
        nextStr={'Finish'}
        prevFunc={(): void => props.navigation.navigate('Preview')}
        nextFunc={(): void => props.navigation.navigate('TripList')}
      />
    </ScrollView>
  );
}

export default Page;
