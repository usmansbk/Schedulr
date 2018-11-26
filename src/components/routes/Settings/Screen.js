import React from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';

export default (props) => (
  <React.Fragment>
    <Appbar.Header>
      <Appbar.BackAction onPress={props.goBack} />
      <Appbar.Content
        title="Settings"
      />
    </Appbar.Header>
  </React.Fragment>
);