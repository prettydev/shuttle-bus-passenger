import { Block, Button, theme } from 'galio-framework';
import React, { ReactElement } from 'react';

const PrevNextButtons = (props): ReactElement => {
  return (
    <Block
      middle
      row
      space="around"
      style={{ marginTop: 20, paddingBottom: 24 }}
    >
      <Button small style={{ width: '30%' }} onPress={props.prevFunc}>
        Prev
      </Button>
      <Button small style={{ width: '30%' }} onPress={props.nextFunc}>
        {props.nextStr ? props.nextStr : 'Next'}
      </Button>
    </Block>
  );
};

export default PrevNextButtons;
