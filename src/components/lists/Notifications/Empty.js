import React from 'react';
import { View } from 'react-native';
import { Headline, Caption } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import colors from 'config/colors';

export default () => (
  <View style={styles.empty}>
    <Icon name="notifications-active" size={48} color={colors.gray} />
    <Headline style={styles.emptyTitle}>No new notifications</Headline>
    <Caption style={styles.paragraph}>All caught up!</Caption>
  </View>
);
