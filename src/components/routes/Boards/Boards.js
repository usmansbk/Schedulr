import React from 'react';
import List from '../../lists/Boards';
import FAB from '../../common/Fab';

export default (props) => (
  <React.Fragment>
    <List />
    <FAB
      icon="add"
      onPress={() => props.navigation.navigate('NewBoard')}
    />
  </React.Fragment>
);
