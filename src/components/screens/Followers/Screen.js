import React from 'react';
import Followers from './Followers';

export default class Screen extends React.Component {
  _goBack = () => this.props.navigation.goBack();
  render() {
    const isAuthor = this.props.navigation.getParam('isAuthor');
    return (
      <Followers
        isAuthor={isAuthor}
        goBack={this._goBack}
      />
    )
  }
}