import React from 'react';
import { StatusBar } from 'react-native';
import List from '../../lists/Events';
import FAB from '../../common/Fab';
import colors from '../../../config/colors';

export default (props) => (
  <React.Fragment>
    <StatusBar
      backgroundColor={colors.primary_dark}
      barStyle="light-content"
    />
    <List />
    <FAB
      icon="edit"
      onPress={() => props.navigation.navigate('NewEvent')}
    />
  </React.Fragment>
);

