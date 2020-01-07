import { StyleSheet } from 'react-native';

export const COLORS = {
  WHITE: '#FFF',
  BLACK: '#000',
  PRIMARY: '#5FB0FF',
  GREY: '#B4B4B4',
};

export const chatRoomStyles = StyleSheet.create({
  messagesContainer: {
    height: '100%',
    paddingBottom: 100,
  },
  inputContainer: {
    width: '100%',
    height: 60,
    position: 'absolute',
    bottom: 0,
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 10,

    borderTopWidth: 1,
    borderTopColor: COLORS.GREY,
  },
});
