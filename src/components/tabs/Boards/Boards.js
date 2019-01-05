import React from 'react';
import Toast from 'react-native-simple-toast';
import List from '../../lists/Boards';
import FAB from '../../common/Fab';

export default (props) => {
  if (props.error) {
    Toast.show(props.error.message, Toast.SHORT);
  }
  return (
  <React.Fragment>
    <List
      loading={props.loading}
      boards={props.boards}
      onRefresh={props.onRefresh}
    />
    <FAB
      icon="add"
      onPress={() => props.navigation.navigate('NewBoard')}
    />
  </React.Fragment>
)};
