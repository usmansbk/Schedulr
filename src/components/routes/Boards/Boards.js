import React from 'react';
import List from '../../lists/Boards';
import FAB from '../../common/Fab';

export default (props) => (
  <React.Fragment>
    <List
      loading={props.loading}
      boards={props.boards}
      onRefresh={props.onRefresh}
      error={props.error}
    />
    <FAB
      icon="add"
      onPress={() => props.navigation.navigate('NewBoard')}
    />
  </React.Fragment>
);
