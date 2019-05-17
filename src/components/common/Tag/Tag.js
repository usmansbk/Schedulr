import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { inject, observer } from 'mobx-react/native';

export default inject('stores')(observer(
  ({ status, stores }) => {
    const styles = stores.appStyles.tag;
    let statusStyle = styles[status];
    return (
      <Text style={[styles.text, statusStyle]}>{status}</Text>
    );
  }
));