import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { I18n } from 'aws-amplify';
import styles from './styles';

export default ({ disabled, loading, onPress }) => (
  <TouchableOpacity
    disabled={disabled}
    onPress={onPress}
    style={styles.container}
  >
    <View style={styles.content}>
      <Image style={styles.logo} source={require('./img/logo.png')} />
      <Text
        allowFontScaling={false}
        style={styles.text}>
      {
        loading ? I18n.get("BUTTON_loggingIn") : I18n.get("BUTTON_continueWithFacebook")
      }</Text>
    </View>
  </TouchableOpacity>
);
