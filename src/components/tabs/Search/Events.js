import React from 'react';
import List from '../../lists/EventSearch';

export default class Events extends React.PureComponent {
  render() {
    // alert(this.props.screenProps.query);
    return (
      <List />
    );
  }
}
