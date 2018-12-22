import React from 'react';
import GroupEvents from '../../routes/GroupEvents';

export default class Screen extends React.Component {
  _onBack = () => this.props.navigation.goBack();
  _navigateToGroupInfo = (id) => this.props.navigation.navigate('GroupInfo', { id });
  _navigateToNewEvent = (id) => this.props.navigation.navigate('NewGroupEvent', { id });

  render() {
    return (
      <GroupEvents
        navigateToGroupInfo={this._navigateToGroupInfo}
        navigateToNewEvent={this._navigateToNewEvent}
        onPress={this._onBack}
      />
    );
  }
}
