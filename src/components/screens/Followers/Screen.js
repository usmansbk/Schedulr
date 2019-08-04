import React from 'react';
import Followers from './Followers';

export default class Screen extends React.Component {
  _goBack = () => this.props.navigation.goBack();
  render() {
    const isOwner = this.props.navigation.getParam('isOwner');
    return (
      <Followers
        id={this.props.navigation.getParam('id')}
        isOwner={isOwner}
        goBack={this._goBack}
      />
    )
  }
}