import React, { ReactElement, useCallback, useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { createMessage, fetchMessages, getMessage } from '../../apis/firebase';
import { Button } from 'react-native-paper';
import { COLORS } from './ChatStyles';
import Loader from '../shared/Loader';
import { theme } from '../core/theme';
import { useAppContext } from '../../providers/AppProvider';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
  },
  inputContainer: {
    width: '75%',
  },
  input: {
    height: 40,
    borderColor: COLORS.GREY,
    borderWidth: 1,
    borderRadius: 3,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
});

export default function Input(): ReactElement {
  const {
    state: { user },
  } = useAppContext();
  const uid = user.userId;

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handlePress = useCallback(
    function() {
      setIsLoading(true);
      createMessage({ message, uid }).then(function() {
        setIsLoading(false);
        setMessage('');
      });
    },
    [message],
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Write you message"
        />
      </View>

      {!isLoading && (
        <Button
          icon="send"
          mode="outlined"
          onPress={handlePress}
          color={theme.colors.icon}
        >
          Send
        </Button>
      )}

      {isLoading && (
        <View style={styles.container}>
          <Loader />
        </View>
      )}
    </View>
  );
}
