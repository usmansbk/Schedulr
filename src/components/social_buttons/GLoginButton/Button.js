import React from 'react';
import { View, Text } from 'react-native';
import Image from 'react-native-fast-image';
import { TouchableRipple } from 'react-native-paper';
import { I18n } from 'aws-amplify';
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
        allowFontScaling={false}
        style={styles.text}>{
          loading ? I18n.get("BUTTON_signingIn") : I18n.get("BUTTON_continueWithGoogle")
        }</Text>
    </View>
  </TouchableRipple>
);
