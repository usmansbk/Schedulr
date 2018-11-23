import React from 'react';
import GroupEvents from '../../routes/GroupEvents';

export default class Screen extends React.Component {
  _onBack = () => this.props.navigation.goBack();
  _handleShare = () => console.log('Share group');
  _navigateToGroupInfo = (id) => this.props.navigation.navigate('GroupInfo', { id });
  
  render() {
    return (
      <GroupEvents
        {...defaultGroup}
        handleShare={this._handleShare}
        navigateToGroupInfo={this._navigateToGroupInfo}
        onPress={this._onBack}
      />
    );
  }
}

const defaultGroup = {
  id: 1,
  name: 'Demo dev',
  description: 'lorem Ipsum Dolor Amet Schdlr Studio Code',
  following: true,
  isAdmin: true,
}