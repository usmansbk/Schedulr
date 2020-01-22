import React from 'react';
import List from 'components/lists/Tickets';

export default class Tickets extends React.Component {
  _onPress = () => console.log('New event with Ticket');

  render() {
    return (
      <List />
    );
  }
}