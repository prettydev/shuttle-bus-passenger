import React, { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from './ChatStyles';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 3,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textContainer: {
    width: 160,
    backgroundColor: COLORS.GREY,

    borderRadius: 40,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginLeft: 10,
  },
  rightContainer: {
    justifyContent: 'flex-end',
  },
  rightTextContainer: {
    backgroundColor: COLORS.PRIMARY,
    marginRight: 10,
  },
  leftText: {
    textAlign: 'left',
  },
  rightText: {
    textAlign: 'right',
  },
  text: {
    fontSize: 12,
  },
});

const flattenedStyles = {
  container: StyleSheet.flatten([styles.container, styles.rightContainer]),
  textContainer: StyleSheet.flatten([
    styles.textContainer,
    styles.rightTextContainer,
  ]),
  leftText: StyleSheet.flatten([styles.leftText, styles.text]),
  rightText: StyleSheet.flatten([styles.rightText, styles.text]),
};

export default function Message({ message, side }): ReactElement {
  const isLeftSide = side === 'left';

  const containerStyles = isLeftSide
    ? styles.container
    : flattenedStyles.container;
  const textContainerStyles = isLeftSide
    ? styles.textContainer
    : flattenedStyles.textContainer;
  const textStyles = isLeftSide
    ? flattenedStyles.leftText
    : flattenedStyles.rightText;

  return (
    <View style={containerStyles}>
      <View style={textContainerStyles}>
        <Text style={textStyles}>{message}</Text>
      </View>
    </View>
  );
}
