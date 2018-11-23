import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Headline, Paragraph } from 'react-native-paper';
import styles from './styles';

export default () => (
  <View style={styles.empty}>
    <Headline style={styles.emptyTitle}>No group</Headline>
    <Paragraph style={styles.emptyMessage}>
    Follow a group or create one by pressing the bottom-right button.
    </Paragraph>
    <Icon style={styles.emptyIcon} name="add-circle-outline" />
  </View>
);
