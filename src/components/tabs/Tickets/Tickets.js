import React from 'react';
import List from 'components/lists/Tickets';
import Fab from 'components/common/Fab';

export default class Tickets extends React.Component {
  _onPress = () => console.log('New event with Ticket');

  render() {
    return (
      <>
      <List />
      <Fab
        icon="edit-2"
        onPress={this._onPress}
      />
      </>
    );
  }
}