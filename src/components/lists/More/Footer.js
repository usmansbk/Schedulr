import React from 'react';
import { List } from 'react-native-paper';
import styles from './styles';

export default (props) => (
  <List.Item
    left={() => <List.Icon icon="exit-to-app" />}
    title="Sign out"
    style={styles.footer}
    onPress={props.openDialog}
  />
);