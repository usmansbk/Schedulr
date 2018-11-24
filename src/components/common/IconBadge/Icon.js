import React from 'react';
import numeral from 'numeral';
import { IconButton, Caption } from 'react-native-paper';
import { View, Text } from 'react-native';
import styles from '../../../config/styles';

export default ({ color, icon, size, count, onPress}) => (
  <View style={styles.icon}>
    <IconButton
      icon={icon}
      onPress={onPress}
      size={size}
      color={color}
    />
    { Boolean(count) && <Caption>{count && numeral(count).format('0a')}</Caption> }
  </View>
);
