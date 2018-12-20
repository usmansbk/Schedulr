import React from 'react';
import Profile from '../../routes/UserProfile';

export default class Screen extends React.Component {
  static defaultProps = {
    loading: false,
    name: 'User Profile',
    email: '',
    pictureUrl: null,
  }
  _goBack = () => this.props.navigation.goBack();
  render() {
    return (
      <Profile
        goBack={this._goBack}
        name={this.props.name}
        pictureUrl={this.props.pictureUrl}
      />
    )
  }
}