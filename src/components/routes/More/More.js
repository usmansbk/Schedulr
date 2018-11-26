import React from 'react';
import { Appbar } from 'react-native-paper';
import List from '../../lists/More';

export default (props) => (
  <React.Fragment>
    <Appbar.Header>
      <Appbar.BackAction
        onPress={() => props.navigation.goBack()}
      />
      <Appbar.Content
        title="More" 
      />
    </Appbar.Header>
    <List />
  </React.Fragment>
);

