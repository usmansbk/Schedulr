import React from 'react';
import Profile from '../../routes/UserProfile';

export default class Screen extends React.Component {
  _goBack = () => this.props.navigation.goBack();
  render() {
    return (
      <Profile
        goBack={this._goBack}
      />
    )
  }
}