import { FlatList, SafeAreaView, View } from 'react-native';
import React, { ReactElement, useEffect, useReducer } from 'react';
import { addMessage, createMessage, fetchMessages } from '../../apis/firebase';

import Input from './ChatInput';
import Message from './ChatMessage';
import { messagesReducer } from './ChatReducers';
import { chatRoomStyles as styles } from './ChatStyles';
import { useAppContext } from '../../providers/AppProvider';

export default function HooksExample(): ReactElement {
  const {
    state: { user },
  } = useAppContext();
  const uid = user.userId;
  const [messages, dispatchMessages] = useReducer(messagesReducer, []);

  useEffect(function(): any {
    addMessage((snapshot) => {
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
            const side = data.user_id === uid ? 'right' : 'left';

            return <Message side={side} message={data.message} />;
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Input />
      </View>
    </SafeAreaView>
  );
}
