import React from 'react';
import { View, Text } from 'react-native';
import AccountAvatar from '../../common/AccountAvatar';
import styles from './styles';

export default () => (
  <View style={styles.header}>
    <AccountAvatar />
  </View>
);