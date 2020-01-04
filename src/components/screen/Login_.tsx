import * as Yup from 'yup';
import { Button, Input, Text } from 'react-native-elements';
import { DefaultNavigationProps, Rider, User } from '../../types';
import React, { ReactElement, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  getRiderDetails,
  loginWithEmail,
  signupWithEmail,
} from '../../apis/firebase';
import AppLogo from '../shared/AppLogo';

import { getString } from '../../../STRINGS';
import { useAppContext } from '../../providers/AppProvider';
import { useForm } from 'react-hook-form';

interface Props {
  navigation: DefaultNavigationProps<'App'>;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(6, 'Password must have at least 6 characters '),
});

function Page(props: Props): ReactElement {
  const {
    state: { user, booking },
    setUser,
    setRider,
  } = useAppContext();

  const [loginKind, setLoginKind] = useState<string>('email');

  const goToSignup = (): void => props.navigation.navigate('Register');
  const goToForgotPassword = (): void =>
    props.navigation.navigate('ForgotPassword');

  async function signup(email, password): Promise<void> {
    try {
      await signupWithEmail(email, password);
    } catch (e) {
      console.error(e.message);
    }
  }
  async function login(email, password): Promise<void> {
    try {
      const userCredential = await loginWithEmail(email, password);

      console.log('ghhhhhhhhhhhhhhhhhhhhhhh================', userCredential);

      if (userCredential.user) {
        getRiderDetails(userCredential.user.uid, (res) => {
          console.log('ccccccccccccccccccccc================', res.id);
          console.log('jjjjjjjjjjjjjjjjjjjjjjjjjj================', res.data());

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

            props.navigation.navigate('App');
          } else {
            props.navigation.navigate('Auth');
          }
        });
      }
    } catch (e) {
      console.error(e.message);
    }
  }

  useEffect(() => {
    // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // return subscriber; // unsubscribe on unmount
  }, []);

  const { register, setValue, handleSubmit, errors } = useForm();
  const onSubmit = (data): void => {
    login(data.email, data.password);
  };

  const switchLoginKind = (): void => {
    setLoginKind(loginKind === 'email' ? 'phone' : 'email');
  };

  return (
    <>
      <Input
        placeholder="email"
        ref={register({ name: 'email' }, { required: true })}
        onChangeText={(text): void => setValue('email', text, true)}
      />
      {errors.email && <Text>Email is required.</Text>}
      <Input
        placeholder="password"
        password
        viewPass
        ref={register({ name: 'password' }, { required: true })}
        onChangeText={(text): void => setValue('password', text)}
      />
      {errors.password && <Text>Password is required.</Text>}

      <Button onPress={handleSubmit(onSubmit)}>{getString('LOGIN')}</Button>
    </>
  );
}

export default Page;
