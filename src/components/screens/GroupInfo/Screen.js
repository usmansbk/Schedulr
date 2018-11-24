import React from 'react';
import GroupInfo from '../../routes/GroupInfo';

export default class Screen extends React.Component {
  _goBack = () => this.props.navigation.goBack();
  render() {
    return (
      <GroupInfo
        goBack={this._goBack}
        {...defaultGroup}
        adminId={defaultGroup.admin.id}
        adminName={defaultGroup.admin.name}
      />
    );
  }
}

const defaultGroup = {
  id: 1,
  name: 'Demo-V',
  description: `In this guide we will set up our app to handle external URIs. Let's suppose that we want a URI like mychat://chat/Eric to open our app and link straight into a chat screen for some user named "Eric".`,
  closed: true,
  isPrivate: true,
  link: 'schdlr.com',
  following: true,
  isAdmin: true,
  followersCount: 20000,
  createdAt: Date.now(),
  admin: {
    id: 2,
    name: 'Babakolo Usman Suleiman',
  }
}