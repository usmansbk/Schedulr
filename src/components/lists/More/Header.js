import React from 'react';
import { View } from 'react-native';
import AccountAvatar from 'components/common/AccountAvatar';
import styles from './styles';

export default () => (
  <View style={styles.header}>
    <AccountAvatar />
  </View>
);