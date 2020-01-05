import React, { ReactElement } from 'react';
import { Button } from 'react-native-paper';
import { View } from 'react-native';

const PrevNextButtons = (props): ReactElement => {
  return (
    <View>
      <Button
        compact={true}
        icon="camera"
        mode="contained"
        onPress={props.prevFunc}
      >
        Prev
      </Button>
      <Button
        compact={true}
        icon="camera"
        mode="contained"
        onPress={props.nextFunc}
      >
        {props.nextStr ? props.nextStr : 'Next'}
      </Button>
    </View>
  );
};

export default PrevNextButtons;
