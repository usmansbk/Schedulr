import React from 'react';
import { IconButton } from 'react-native-paper';
import { View, Text } from 'react-native';
import styles from '../../../config/styles';


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
