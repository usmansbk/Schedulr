import React from 'react';
import Followers from '../../tabs/Followers';

export default class Screen extends React.Component {
  _goBack = () => this.props.navigation.goBack();
  render() {
    return (
      <Followers
        goBack={this._goBack}
      />
    )
  }
}