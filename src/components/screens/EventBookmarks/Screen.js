import React from 'react';
import Bookmarks from './Bookmarks';

export default class Screen extends React.Component {
  _goBack = () => this.props.navigation.goBack();
  render() {
    const isOwner = this.props.navigation.getParam('isOwner');
    return (
      <Bookmarks
        id={this.props.navigation.getParam('id')}
        isOwner={isOwner}
        goBack={this._goBack}
      />
    )
  }
}