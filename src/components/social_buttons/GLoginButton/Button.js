import React from 'react';
import { View, Image, Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import styles from './styles';

export default ({ disabled, loading, onPress }) => (
  <TouchableRipple
    disabled={disabled}
    onPress={onPress}
    style={styles.container}
  >
    <View style={styles.content}>
      <Image style={styles.logo} source={require('./img/logo.png')} />
      <Text
        style={styles.text}>{
          loading ? 'Signing in...' : 'Continue with Google'
        }</Text>
    </View>
  </TouchableRipple>
);
