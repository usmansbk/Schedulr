import React from 'react';
import Toast from 'react-native-simple-toast';
import List from '../../lists/Boards';
import FAB from '../../common/Fab';

export default class Boards extends React.Component {
  shouldComponentUpdate = (nextProps) => {
    return ((nextProps.loading) !== this.props.loading) || (
      nextProps.boards !== this.props.boards
    );
  }
  
  render() {
    if (this.props.error) {
      Toast.show(this.props.error.message, Toast.SHORT);
    }
    return (
      <React.Fragment>
        <List
          loading={this.props.loading}
          boards={this.props.boards}
          onRefresh={this.props.onRefresh}
        />
        <FAB
          icon="add"
          onPress={() => this.props.navigation.navigate('NewBoard')}
        />
      </React.Fragment>
    )
  }
}