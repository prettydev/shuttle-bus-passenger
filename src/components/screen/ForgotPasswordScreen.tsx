import { DefaultNavigationProps, Rider, User } from '../../types';
import React, { ReactElement, memo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import BackButton from '../shared/BackButton';
import Background from '../shared/Background';
import Button from '../shared/Button';
import Header from '../shared/Header';
import Logo from '../shared/Logo';
import TextInput from '../shared/TextInput';
import { emailValidator } from '../core/utils';
import { theme } from '../core/theme';

interface Props {
  navigation: DefaultNavigationProps<'App'>;
}

const styles = StyleSheet.create({
  back: {
    width: '100%',
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
  label: {
    color: theme.colors.secondary,
    width: '100%',
  },
});

const ForgotPasswordScreen = ({ navigation }: Props): ReactElement => {
  const [email, setEmail] = useState({ value: '', error: '' });

  const _onSendPressed = (): void => {
    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }

    navigation.navigate('Login');
  };

  return (
    <Background>
      <Logo />

      <Header>Restore Password</Header>

      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text: string): void =>
          setEmail({ value: text, error: '' })
        }
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <Button mode="contained" onPress={_onSendPressed} style={styles.button}>
        Send Reset Instructions
      </Button>

      <TouchableOpacity
        style={styles.back}
        onPress={(): void => navigation.navigate('Login')}
      >
        <Text style={styles.label}>← Back to login</Text>
      </TouchableOpacity>
    </Background>
  );
};

export default memo(ForgotPasswordScreen);
