import React from 'react';
import List from '../../lists/Events';
import FAB from '../../common/Fab';

export default (props) => (
  <React.Fragment>
    <List />
    <FAB
      icon="edit"
      onPress={() => props.navigation.navigate('NewEvent')}
    />
  </React.Fragment>
);

