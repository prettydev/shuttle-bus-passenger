import * as Yup from 'yup';
import { Block, Input, Text } from 'galio-framework';
import { Button, StyleSheet, View } from 'react-native';
import { DefaultNavigationProps, User } from '../../types';
import React, { ReactElement, useEffect, useState } from 'react';
import { loginWithEmail, signupWithEmail } from '../../apis/firebase';
import AppLogo from '../shared/AppLogo';

import { getString } from '../../../STRINGS';
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

      console.log('ghhhhhhhhhhhhhhhhhhhhhhh', userCredential);

      // if (userCredential.user) {
      //   await firebase.getRiderDetails(
      //     userCredential.user.uid,
      //     props.navigation.navigate('App'),
      //   );
      // }
      // {
      //   "additionalUserInfo": {"isNewUser": false},
      //   "user": {
      //       "displayName": null,
      //       "email": "cba@aa.com",
      //       "emailVerified": false,
      //       "isAnonymous": false,
      //       "metadata": [Object],
      //       "phoneNumber": null,
      //       "photoURL": null,
      //       "providerData": [Array],
      //       "providerId": "firebase",
      //       "uid": "iES9ff9HksWE6kIJHpHqlla4Df42"
      //     }
      // }
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

  return (
    <Block flex center>
      <Input
        placeholder="email"
        ref={register({ name: 'email' }, { required: true })}
        onChangeText={(text): void => setValue('email', text, true)}
      />
      {errors.email && <Text>Email is required.</Text>}

      <Input
        placeholder="password"
        ref={register({ name: 'password' })}
        onChangeText={(text): void => setValue('password', text)}
      />
      {errors.password && <Text>Password is required.</Text>}

      <Button onPress={handleSubmit(onSubmit)} title={getString('LOGIN')} />
    </Block>
  );
}

export default Page;
