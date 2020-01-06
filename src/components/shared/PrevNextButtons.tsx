import React, { ReactElement } from 'react';
import { Button } from 'react-native-paper';
import { View } from 'react-native';
import { theme } from '../core/theme';

const PrevNextButtons = (props): ReactElement => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          padding: 10,
          justifyContent: 'space-around',
        },
        { ...props.style },
      ]}
    >
      <Button
        compact={true}
        icon="chevron-left"
        mode="outlined"
        onPress={props.prevFunc}
        color={theme.colors.icon}
      >
        Prev
      </Button>
      <Button
        compact={true}
        icon="chevron-right"
        mode="outlined"
        onPress={props.nextFunc}
        color={theme.colors.icon}
      >
        {props.nextStr ? props.nextStr : 'Next'}
      </Button>
    </View>
  );
};

export default PrevNextButtons;
