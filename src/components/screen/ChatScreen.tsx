import {
  DefaultBookingNavigationProps,
  DefaultHistoryNavigationProps,
  DefaultHomeNavigationProps,
} from '../../types';
import { FlatList, SafeAreaView, View } from 'react-native';
import React, { ReactElement, useEffect, useReducer } from 'react';
import { createMessage, fetchMessages, getMessage } from '../../apis/firebase';
import Input from './ChatInput';
import Message from './ChatMessage';
import { NavigationStackProp } from 'react-navigation-stack';
// import { StackNavigationProp } from '@react-navigation/stack';
import { messagesReducer } from './ChatReducers';
import { chatRoomStyles as styles } from './ChatStyles';
import { useAppContext } from '../../providers/AppProvider';

// interface Props {
//   navigation:
//     | DefaultHomeNavigationProps<'Home'>
//     | DefaultHistoryNavigationProps<'History'>
//     | DefaultBookingNavigationProps<'TripList'>;
// }

type Props = {
  navigation: NavigationStackProp<{ driverId: string; tripId: string }>;
};

export default function Page(props: Props): ReactElement {
  const {
    state: { user },
  } = useAppContext();
  const driverId = props.navigation.getParam('driverId');
  const tripId = props.navigation.getParam('tripId');

  const [messages, dispatchMessages] = useReducer(messagesReducer, []);

  useEffect(function(): any {
    getMessage((snapshot) => {
      dispatchMessages({ type: 'add', payload: snapshot.docs });
    });
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.messagesContainer}>
        <FlatList
          inverted
          data={messages}
          keyExtractor={function(item: any): any {
            return item.id;
          }}
          renderItem={function({ item }: any): ReactElement {
            const data = item.data();
            const side = data.senderId === user.userId ? 'right' : 'left';

            return <Message side={side} message={data.message} />;
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Input tripId={tripId} driverId={driverId} />
      </View>
    </SafeAreaView>
  );
}
