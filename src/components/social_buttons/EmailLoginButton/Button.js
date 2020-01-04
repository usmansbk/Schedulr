import React from 'react';
import { View, Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { I18n } from 'aws-amplify';
import styles from './styles';

export default ({ disabled, onPress }) => (
  <TouchableRipple
    disabled={disabled}
    onPress={onPress}
    style={styles.container}
  >
    <View style={styles.content}>
      <Text
        allowFontScaling={false}
        style={styles.text}>
        {I18n.get("BUTTON_continueWithEmail")}
      </Text>
    </View>
  </TouchableRipple>
);
