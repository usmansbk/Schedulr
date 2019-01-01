import React from 'react';
import Toast from 'react-native-simple-toast';
import List from '../../lists/Events';
import FAB from '../../common/Fab';

export default (props) => {
  if (props.error) {
    Toast.show(props.error.message, Toast.SHORT);
  }
  return (
    <React.Fragment>
      <List
        loading={props.loading}
        events={props.events}
        hasPreviousEvents={Boolean(props.nextToken)}
        onRefresh={props.onRefresh}
      />
      <FAB
        icon="edit"
        onPress={() => props.navigation.navigate('NewEvent')}
      />
    </React.Fragment>
  )
};

