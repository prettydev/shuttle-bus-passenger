import { DefaultAuthNavigationProps, Rider, User } from '../../types';
import React, { ReactElement, memo, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { emailValidator, passwordValidator } from '../core/utils';
import {
  getRiderDetails,
  loginWithEmail,
  loginWithPhone,
  signupWithEmail,
} from '../../apis/firebase';
import BackButton from '../shared/BackButton';
import Background from '../shared/Background';
import Button from '../shared/Button';
import Header from '../shared/Header';
import Logo from '../shared/Logo';
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

// const LoginScreen = ({ navigation }: Props) => {
function PhoneLoginScreen(props: Props): ReactElement {
  const {
    state: { user, booking },
    setUser,
    setRider,
  } = useAppContext();

  const [phone, setPhone] = useState('');
  const [confirmResult, setConfirmResult] = useState(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [userId, setUserId] = useState('');

  const validatePhoneNumber = (): any => {
    const regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    return regexp.test(phone);
  };

  async function handleSendCode(): Promise<void> {
    // Request to send OTP
    if (validatePhoneNumber()) {
      try {
        const result = await loginWithPhone(phone);
        if (result) {
          setConfirmResult(result);
          console.log('loginWithPhone---------', result);
        }
      } catch (error) {
        console.log('phone number login error', error);
      }
    } else {
      console.log('Invalid Phone Number');
    }
  }

  const changePhoneNumber = (): void => {
    setConfirmResult(null);
    setVerificationCode('');
  };

  async function handleVerifyCode(): Promise<void> {
    // Request for OTP verification
    if (verificationCode.length === 6) {
      try {
        // if (confirmResult !== null) {
        //   await confirmResult.confirm(verificationCode);
        // } // User entered code
        // Successful login - onAuthStateChanged is triggered
      } catch (e) {
        console.log('verify exception', e); // Invalid code
      }
      // confirmResult
      //   .confirm(verificationCode)
      //   .then((user) => {
      //     setUserId(user.uid);
      //     console.log(`Verified! ${user.uid}`);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    } else {
      console.log('Please enter a 6 digit OTP code.');
    }
  }

  const renderConfirmationCodeView = (): ReactElement => {
    return (
      <View>
        <TextInput
          placeholder="Verification code"
          placeholderTextColor="#eee"
          value={verificationCode}
          keyboardType="numeric"
          onChangeText={(verificationCode): void => {
            setVerificationCode(verificationCode);
          }}
          maxLength={6}
        />
        <TouchableOpacity
          style={[{ marginTop: 20 }]}
          onPress={(): Promise<void> => handleVerifyCode()}
        >
          <Text>Verify Code</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={[{ backgroundColor: '#333' }]}>
      <View>
        <TextInput
          placeholder="Phone Number with country code"
          placeholderTextColor="#eee"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={(phone): void => {
            setPhone(phone);
          }}
          maxLength={15}
          editable={!confirmResult}
        />

        <TouchableOpacity
          style={[{ marginTop: 20 }]}
          onPress={(): void => {
            confirmResult ? changePhoneNumber() : handleSendCode();
          }}
        >
          <Text>{confirmResult ? 'Change Phone Number' : 'Send Code'}</Text>
        </TouchableOpacity>

        {confirmResult ? renderConfirmationCodeView() : null}
      </View>
    </SafeAreaView>
  );
}

export default memo(PhoneLoginScreen);
