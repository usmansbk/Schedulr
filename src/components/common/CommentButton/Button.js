import React from 'react';
import { IconButton } from 'react-native-paper';
import { View, Text } from 'react-native';
import styles from '../../../config/styles';

export default ({ color, commentsCount, onPress}) => (
  <View style={styles.icon}>
    <IconButton
      icon="chat-bubble-outline"
      onPress={onPress}
      size={20}
      color={color}
    />
    <Text style={styles.badge}>{commentsCount && commentsCount}</Text>
  </View>
);
