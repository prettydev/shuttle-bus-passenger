import React, { memo } from 'react';
import { Button as PaperButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { theme } from '../core/theme';

type Props = React.ComponentProps<typeof PaperButton>;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
});

const Button = ({ mode, style, children, ...props }: Props) => (
  <PaperButton
    style={[
      styles.button,
      mode === 'outlined' && { backgroundColor: theme.colors.icon },
      style,
    ]}
    color={'white'}
    labelStyle={styles.text}
    mode={mode}
    {...props}
  >
    {children}
  </PaperButton>
);

export default memo(Button);
