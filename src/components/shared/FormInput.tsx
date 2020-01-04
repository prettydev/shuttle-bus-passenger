import React, { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';

const styles = StyleSheet.create({
  inputContainer: {
    margin: 15,
  },
  iconStyle: {
    marginRight: 10,
  },
});

const FormInput = ({
  iconName,
  iconColor,
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  ...rest
}): ReactElement => (
  <View style={styles.inputContainer}>
    <Input
      {...rest}
      // leftIcon={<Ionicons name={iconName} size={28} color={iconColor} />}
      leftIconContainerStyle={styles.iconStyle}
      placeholderTextColor="grey"
      name={name}
      placeholder={placeholder}
      style={styles.input}
    />
  </View>
);

export default FormInput;
