import React from 'react';
import { IconButton } from 'react-native-paper';
import { View, Text } from 'react-native';
import styles from '../../../config/styles';

export default ({ id, color, commentsCount, id}) => (
  <View style={styles.icon}>
    <IconButton
      icon="chat-bubble-outline"
      onPress={() => console.log('action')}
      size={20}
      color={color}
    />
    <Text style={styles.badge}>{commentsCount && commentsCount}</Text>
  </View>
);
