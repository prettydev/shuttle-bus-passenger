import { DefaultAuthNavigationProps, Rider, User } from '../../types';
import React, { ReactElement, memo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { emailValidator, passwordValidator } from '../core/utils';
import { getRiderDetails, loginWithEmail } from '../../apis/firebase';
import Background from '../shared/Background';
import Button from '../shared/Button';
import Header from '../shared/Header';
import Logo from '../shared/Logo';
import TextInput from '../shared/TextInput';
import { theme } from '../core/theme';
import { useAppContext } from '../../providers/AppProvider';
interface Props {
  navigation: DefaultAuthNavigationProps<'Login'>;
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.icon,
  },
});

function LoginScreen(props: Props): ReactElement {
  const { setUser, setRider } = useAppContext();

  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [errorMsg, setErrorMsg] = useState('');

  async function _onLoginPressed(): Promise<void> {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    try {
      const userCredential = await loginWithEmail(email.value, password.value);

      console.log(
        '%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%login error, ',
        userCredential,
      );

      if (userCredential.user) {
        await getRiderDetails(userCredential.user.uid, (res) => {
          console.log(
            '!!!!!!!!!!!!!!!!!!!!get rider details data, ',
            res.data(),
          );

          if (res.data()) {
            const user: User = {
              userId: res.id,
              name: res.data().name,
            };
            setUser(user);

            const rider: Rider = {
              riderId: res.id,
              riderName: res.data().name,
              riderEmail: res.data().email,
              riderPhone: res.data().phone,
            };
            setRider(rider);
          }
          props.navigation.navigate('App');
        });
      }
    } catch (e) {
      console.log('#####################################login error, ', e);
      setErrorMsg(e.message);
    }
  }

  return (
    <Background>
      <Logo />

      <Header>Shuttle Bus Passenger</Header>

      <TouchableOpacity
        onPress={(): void => props.navigation.navigate('PhoneLogin')}
      >
        <Text style={styles.label}>email:test@test.com, pass:123123</Text>
      </TouchableOpacity>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text: string): void => {
          setErrorMsg('');
          setEmail({ value: text, error: '' });
        }}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text: string): void => {
          setErrorMsg('');
          setPassword({ value: text, error: '' });
        }}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={(): void => props.navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      {errorMsg ? (
        <Text style={{ color: theme.colors.error }}>{errorMsg}</Text>
      ) : null}

      <Button mode="outlined" onPress={_onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity
          onPress={(): void => props.navigation.navigate('Register')}
        >
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

export default memo(LoginScreen);
