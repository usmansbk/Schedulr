import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text, Headline } from 'react-native-paper';
import styles from './styles';

export default () => (
  <View style={styles.empty}>
    <Headline>No upcoming event</Headline>
    <Text>Create an event by pressing the bottom-right button below</Text>
    <Icon name="add" />
  </View>
);
