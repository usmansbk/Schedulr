import React from 'react';
import Share from 'react-native-share';
import GroupEvents from '../../routes/GroupEvents';
import env from '../../../config/env';

export default class Screen extends React.Component {
  _onBack = () => this.props.navigation.goBack();
  _handleShare = ({ id, name, description }) => {
    const shareOptions = {
      title: 'Invite via...',
      subject: 'Group Invite',
      message: `Name: ${name}\n${description ? ('Description: ' + description + '\n') : ''}`,
      url: `${env.APP_URL}/group/${id}`
    };
    Share.open(shareOptions);
  };
  _navigateToGroupInfo = (id) => this.props.navigation.navigate('GroupInfo', { id });
  _navigateToNewEvent = (id) => this.props.navigation.navigate('NewGroupEvent', { id });

  render() {
    return (
      <GroupEvents
        handleShare={this._handleShare}
        navigateToGroupInfo={this._navigateToGroupInfo}
        navigateToNewEvent={this._navigateToNewEvent}
        onPress={this._onBack}
      />
    );
  }
}
