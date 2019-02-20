import React from 'react';
import { List } from 'react-native-paper';
import styles, { black } from './styles';

export default (props) => (
  <List.Item
    left={() => <List.Icon color={black} icon="exit-to-app" />}
    title="Sign out"
    style={styles.footer}
    onPress={props.openDialog}
  />
);