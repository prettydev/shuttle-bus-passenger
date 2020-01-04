import React, { ReactElement } from 'react';
import { Button } from 'react-native-elements';

const PrevNextButtons = (props): ReactElement => {
  return (
    <>
      <Button style={{ width: '30%' }} onPress={props.prevFunc}>
        Prev
      </Button>
      <Button style={{ width: '30%' }} onPress={props.nextFunc}>
        {props.nextStr ? props.nextStr : 'Next'}
      </Button>
    </>
  );
};

export default PrevNextButtons;
