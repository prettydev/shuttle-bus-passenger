import React, { ReactElement, memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import { theme } from '../core/theme';

type Props = React.ComponentProps<typeof Input> & { errorText?: string };

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 4,
  },
  input: {
    backgroundColor: theme.colors.surface,
    height: 35,
  },
  error: {
    fontSize: 12,
    color: theme.colors.error,
    paddingHorizontal: 1,
    paddingTop: 2,
  },
});

const TextInput = ({ errorText, ...props }: Props): ReactElement => (
  <View style={styles.container}>
    <Input
      style={styles.input}
      selectionColor={theme.colors.icon}
      underlineColor="transparent"
      theme={{
        colors: { primary: theme.colors.icon },
      }}
      mode="outlined"
      {...props}
    />
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
);

export default memo(TextInput);
