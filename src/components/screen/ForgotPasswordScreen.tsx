import React, { ReactElement, memo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Background from '../shared/Background';
import Button from '../shared/Button';
import { DefaultAuthNavigationProps } from '../../types';
import Header from '../shared/Header';
import Logo from '../shared/Logo';
import TextInput from '../shared/TextInput';
import { emailValidator } from '../core/utils';
import { passwordReset } from '../../apis/firebase';
import { theme } from '../core/theme';

interface Props {
  navigation: DefaultAuthNavigationProps<'Login'>;
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

  async function _onSendPressed(): Promise<void> {
    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
    }

    try {
      await passwordReset(email.value);
      navigation.navigate('Login');
    } catch (error) {
    } finally {
    }
  }

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
        Send Reset Email
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
