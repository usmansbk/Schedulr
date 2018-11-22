import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Headline, Paragraph } from 'react-native-paper';
import styles from './styles';

export default () => (
  <View style={styles.empty}>
    <Headline>No upcoming event</Headline>
    <Paragraph>Create an event by pressing the bottom-right button below</Paragraph>
    <Icon name="add-circle-outline" />
  </View>
);
