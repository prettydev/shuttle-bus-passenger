import React, { ReactElement, memo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  cpasswordValidator,
  emailValidator,
  nameValidator,
  passwordValidator,
  phoneValidator,
} from '../core/utils';
import { createNewRider, signupWithEmail } from '../../apis/firebase';
import Background from '../shared/Background';
import Button from '../shared/Button';
import { DefaultAuthNavigationProps } from '../../types';
import Header from '../shared/Header';
import Logo from '../shared/Logo';
import TextInput from '../shared/TextInput';

import { theme } from '../core/theme';

interface Props {
  navigation: DefaultAuthNavigationProps<'Login'>;
}

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.icon,
  },
});

const RegisterScreen = ({ navigation }: Props): ReactElement => {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [phone, setPhone] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [cpassword, setCPassword] = useState({ value: '', error: '' });

  async function _onSignUpPressed(): Promise<void> {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const phoneError = phoneValidator(phone.value);
    const passwordError = passwordValidator(password.value);
    const cpasswordError = cpasswordValidator(password.value, cpassword.value);

    if (
      emailError ||
      phoneError ||
      passwordError ||
      cpasswordError ||
      nameError
    ) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPhone({ ...phone, error: phoneError });
      setPassword({ ...password, error: passwordError });
      setCPassword({ ...cpassword, error: cpasswordError });
      return;
    }

    try {
      const response = await signupWithEmail(email.value, password.value);

      if (response.user.uid) {
        const userData = {
          email: email.value,
          name: name.value,
          phone: phone.value,
          id: response.user.uid,
        };
        await createNewRider(userData);
        navigation.navigate('Login');
      }
    } catch (error) {
    } finally {
    }
  }

  return (
    <Background>
      <Logo />
      <Header>Create Account</Header>

      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text: string): void =>
          setName({ value: text, error: '' })
        }
        error={!!name.error}
        errorText={name.error}
      />

      <TextInput
        label="Email"
        returnKeyType="next"
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
      <TextInput
        label="Phone number"
        returnKeyType="next"
        value={phone.value}
        onChangeText={(text: string): void =>
          setPhone({ value: text, error: '' })
        }
        error={!!phone.error}
        errorText={phone.error}
        autoCapitalize="none"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text: string): void =>
          setPassword({ value: text, error: '' })
        }
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <TextInput
        label="Confirm password"
        returnKeyType="done"
        value={cpassword.value}
        onChangeText={(text: string): void =>
          setCPassword({ value: text, error: '' })
        }
        error={!!cpassword.error}
        errorText={cpassword.error}
        secureTextEntry
      />

      <Button mode="outlined" onPress={_onSignUpPressed} style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={(): void => navigation.navigate('Login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default memo(RegisterScreen);
