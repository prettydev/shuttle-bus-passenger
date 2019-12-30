import { Block, Text, theme } from 'galio-framework';
import { DefaultNavigationProps } from '../../types';
import PrevNextButtons from '../shared/PrevNextButtons';
import React from 'react';
import { ScrollView } from 'react-native';

interface Props {
  navigation: DefaultNavigationProps<'Home'>;
}

function Page(props: Props): React.ReactElement {
  return (
    <Block flex center>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block flex space="between" style={{ padding: theme.SIZES.BASE }}>
          <Text size={18} center>
            Success!
          </Text>
        </Block>

        <PrevNextButtons
          nextStr={'Finish'}
          prevFunc={(): void => props.navigation.navigate('Preview')}
          nextFunc={(): void => props.navigation.navigate('TripList')}
        />
      </ScrollView>
    </Block>
  );
}

export default Page;
