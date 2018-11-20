import React from 'react';
import { IconButton } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export default ({ size, color, commentsCount, id}) => (
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

const styles = StyleSheet.create({
  icon: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 8
  },
  badge: {
    fontSize: 16,
    color: colors.gray
  }
});
