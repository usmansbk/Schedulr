import React from 'react';
import Toast from 'react-native-simple-toast';
import List from '../../lists/Events';

export default class Starred extends React.Component {
  shouldComponentUpdate = (nextProps) => {
    return ((nextProps.loading) !== this.props.loading) || (
      nextProps.events !== this.props.events
    );
  }
  
  render() {
    if (this.props.error) {
      Toast.show(this.props.error.name, Toast.LONG);
    }

    return (
      <List
        listType="starred"
        loading={this.props.loading}
        events={this.props.events.filter(item => item.isStarred)}
        onRefresh={this.props.onRefresh}
      />
    );
  }
}
