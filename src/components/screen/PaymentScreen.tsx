import { Card, Text } from 'react-native-paper';
import { DefaultNavigationProps, User } from '../../types';
import React, { ReactElement, useEffect, useState } from 'react';
import { View } from 'react-native';
import { requestOneTimePayment } from 'react-native-paypal';
import { useAppContext } from '../../providers/AppProvider';

interface Props {
  navigation: DefaultNavigationProps<'Home'>;
}

function Page(props: Props): ReactElement {
  const {
    state: { user, booking },
  } = useAppContext();

  const {
    nonce,
    payerId,
    email,
    firstName,
    lastName,
    phone,
  } = await requestOneTimePayment(token, {
    amount: '5', // required
    // any PayPal supported currency (see here: https://developer.paypal.com/docs/integration/direct/rest/currency-codes/#paypal-account-payments)
    currency: 'GBP',
    // any PayPal supported locale (see here: https://braintree.github.io/braintree_ios/Classes/BTPayPalRequest.html#/c:objc(cs)BTPayPalRequest(py)localeCode)
    localeCode: 'en_GB',
    shippingAddressRequired: false,
    userAction: 'commit', // display 'Pay Now' on the PayPal review page
    // one of 'authorize', 'sale', 'order'. defaults to 'authorize'. see details here: https://developer.paypal.com/docs/api/payments/v1/#payment-create-request-body
    intent: 'authorize',
  });

  return (
    <View>
      <Text>PaymentScreen</Text>
    </View>
  );
}

export default Page;
