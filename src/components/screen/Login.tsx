import * as Yup from 'yup';

import {
  Alert,
  AsyncStorage,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Fragment, ReactElement, useEffect, useState } from 'react';
import AppLogo from '../shared/AppLogo';
import { DefaultNavigationProps } from '../../types';
import ErrorMessage from '../shared/ErrorMessage';
import FormButton from '../shared/FormButton';
import FormInput from '../shared/FormInput';
import { Formik } from 'formik';
import { HideWithKeyboard } from 'react-native-hide-with-keyboard';

import auth from '@react-native-firebase/auth';
import { getString } from '../../../STRINGS';
import { useForm } from 'react-hook-form';

interface Props {
  navigation: DefaultNavigationProps<'Login'>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
  },
  logoContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 25,
  },
});

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
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('ios-eye');

  const goToSignup = (): void => props.navigation.navigate('Register');
  const goToForgotPassword = (): void =>
    props.navigation.navigate('ForgotPassword');

  const handlePasswordVisibility = (): void => {
    setPasswordVisibility(!passwordVisibility);
    setRightIcon(rightIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye');
  };

  const handleOnLogin = async (values, actions): void => {
    const { email, password } = values;

    try {
      // const response = await props.firebase.loginWithEmail(email, password);
      // if (response.user) {
      // await props.firebase.getRiderDetails(
      //   response.user.uid,
      //   onCollectionUpdate,
      // );
      // }
    } catch (error) {
      actions.setFieldError('general', error.message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const onCollectionUpdate = (doc): void => {
    if (doc.exists) {
      // dispatch({
      //   type: 'RIDER',
      //   userId: doc.id,
      //   riderName: doc.data().name,
      //   riderEmail: doc.data().email,
      //   riderPhone: doc.data().phone,
      // });

      props.navigation.navigate('App');
    } else {
      console.log('Unregistered or deleted rider!');
    }
  };

  function onAuthStateChanged(user): void {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  async function signup(email, password): Promise<void> {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (e) {
      console.error(e.message);
    }
  }
  async function login(email, password): Promise<void> {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );

      console.log('fffffffffffff===', userCredential);

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
    login('cba@aa.com', '123123');
  }, []);

  // if (initializing) {
  //   return (
  //     <View>
  //       <Text>{'..........................'}</Text>
  //     </View>
  //   );
  // }

  const { register, setValue, handleSubmit, errors } = useForm();
  const onSubmit = (data): void => {
    alert('Form Data:' + data.email + '::::' + data.password);
  };

  if (!user) {
    return (
      <View>
        <Text>Email</Text>
        <TextInput
          ref={register({ name: 'email' }, { required: true })}
          onChangeText={(text): void => setValue('email', text, true)}
        />
        {errors.email && <Text>Email is required.</Text>}

        <Text>Password</Text>
        <TextInput
          ref={register({ name: 'password' })}
          onChangeText={(text): void => setValue('password', text)}
        />
        {errors.password && <Text>Password is required.</Text>}

        <Button onPress={handleSubmit(onSubmit)} title={getString('LOGIN')} />
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
}

export default Page;
