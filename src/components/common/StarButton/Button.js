import React from 'react';
import { IconButton } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../../config/colors';


export default ({ color, starred, starsCount, id}) => (
  <View style={styles.icon}>
    <IconButton
      icon={`star${starred ? '' : '-border'}`}
      onPress={() => console.log('action')}
      size={25}
      color={color}
    />
    <Text style={styles.badge}>{starsCount && starsCount}</Text>
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
