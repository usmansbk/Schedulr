import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import colors from '../../../config/colors';

export default ({ disabled, loading, onPress }) => (
  <TouchableRipple
    disabled={disabled}
    onPress={onPress}
    style={styles.container}
  >
    <View style={styles.content}>
      <Image style={styles.logo} source={require('./img/logo.png')} />
      <Text
        style={styles.text}>
      {
        loading ? 'Logging in...' : 'Continue with Facebook'
      }</Text>
    </View>
  </TouchableRipple>
);

const styles = StyleSheet.create({
  color: { backgroundColor: colors.facebook },
  container: {
    width: 250,
    height: 48,
    elevation: 2,
    borderRadius: 2,
    justifyContent:'center',
    margin: 4
  },
  content: {
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.facebook
  },

  logo: {
    height: 32,
    width: 32,
    marginHorizontal: 8
  },
  text: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 4,
    textAlign: 'center',
    fontWeight: 'bold'
  },
})

