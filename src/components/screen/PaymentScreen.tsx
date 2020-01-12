import { Card, Text } from 'react-native-paper';
import {
  CreditCardInput,
  LiteCreditCardInput,
} from 'react-native-credit-card-input';
import { DefaultHomeNavigationProps, User } from '../../types';
import React, { ReactElement, useEffect, useState } from 'react';
import { Switch, View } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
// import { StackNavigationProp } from '@react-navigation/stack';
import { requestOneTimePayment } from 'react-native-paypal';
import { useAppContext } from '../../providers/AppProvider';

// interface Props {
//   navigation: DefaultHomeNavigationProps<'Home'>;
// }

type Props = {
  navigation: NavigationStackProp<{
    driverId: string;
    tripId: string;
    vehicleId: string;
  }>;
};

function Page(props: Props): ReactElement {
  const {
    state: { user, booking },
  } = useAppContext();

  const driverId = props.navigation.getParam('driverId');
  const tripId = props.navigation.getParam('tripId');
  const vehicleId = props.navigation.getParam('vehicleId');

  // const {
  //   nonce,
  //   payerId,
  //   email,
  //   firstName,
  //   lastName,
  //   phone,
  // } = await requestOneTimePayment(token, {
  //   amount: '5', // required
  //   // any PayPal supported currency (see here: https://developer.paypal.com/docs/integration/direct/rest/currency-codes/#paypal-account-payments)
  //   currency: 'GBP',
  //   // any PayPal supported locale (see here: https://braintree.github.io/braintree_ios/Classes/BTPayPalRequest.html#/c:objc(cs)BTPayPalRequest(py)localeCode)
  //   localeCode: 'en_GB',
  //   shippingAddressRequired: false,
  //   userAction: 'commit', // display 'Pay Now' on the PayPal review page
  //   // one of 'authorize', 'sale', 'order'. defaults to 'authorize'. see details here: https://developer.paypal.com/docs/api/payments/v1/#payment-create-request-body
  //   intent: 'authorize',
  // });

  const [useLiteCreditCardInput, setUseLiteCreditCardInput] = useState(false);

  const onChange = (formData): any =>
    console.log(JSON.stringify(formData, null, ' '));
  const onFocus = (field): any => console.log('focusing', field);

  return (
    <View>
      <Switch
        onValueChange={(value: any): any => setUseLiteCreditCardInput(value)}
        value={useLiteCreditCardInput}
      />

      {useLiteCreditCardInput ? (
        <LiteCreditCardInput
          autoFocus
          validColor={'black'}
          invalidColor={'red'}
          placeholderColor={'darkgray'}
          onFocus={onFocus}
          onChange={onChange}
        />
      ) : (
        <CreditCardInput
          autoFocus
          // requiresName
          requiresCVC
          requiresPostalCode
          validColor={'black'}
          invalidColor={'red'}
          placeholderColor={'darkgray'}
          onFocus={onFocus}
          onChange={onChange}
        />
      )}
    </View>
  );
}

export default Page;
