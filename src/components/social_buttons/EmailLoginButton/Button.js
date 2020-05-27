import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { I18n } from 'aws-amplify';
import styles from './styles';

export default ({ disabled, onPress }) => (
  <TouchableOpacity
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
  </TouchableOpacity>
);
