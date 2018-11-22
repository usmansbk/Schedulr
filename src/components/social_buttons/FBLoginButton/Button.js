import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import colors from '../../../config/colors';

export default ({ disabled, loading, onPress }) => (
  <TouchableRipple
    disabled={disabled}
    onPress={onPress}
  >
    <View style={styles.button}>
      <Image style={styles.logo} source={require('./img/logo.png')} />
      <Text
        style={[
          styles.loginText,
          { color: disabled ? colors.disabled : '#fff' }
        ]}>
      {
        loading ? 'Logging in...' : 'Continue with Facebook'
      }</Text>
    </View>
  </TouchableRipple>
);

const styles = StyleSheet.create({
  loginText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 4,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  button: {
    marginVertical: 4,
    width: 250,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.facebook,
    height: 48,
    elevation: 2,
    borderRadius: 2
  },
  logo: {
    height: 32,
    width: 32,
    marginHorizontal: 8
  },
})

