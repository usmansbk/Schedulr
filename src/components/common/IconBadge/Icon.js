import React from 'react';
import numeral from 'numeral';
import {
  Text,
  IconButton
} from 'react-native-paper';
import { View } from 'react-native';
import styles from '../../../config/styles';

export default ({ color, icon, size, count, onPress}) => (
  <View style={styles.button}>
    <IconButton
      onPress={onPress}
      icon={icon}
      size={size}
      color={color}
      style={styles.iconButton}
      animated
    />
    {
      Boolean(count) && (
        <Text style={styles.badge}>{count && numeral(count).format('0a')}</Text>
      )
    }
  </View>
);
