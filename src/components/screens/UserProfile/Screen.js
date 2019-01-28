import React from 'react';
import Profile from './Hoc';

export default class Screen extends React.Component {
  _goBack = () => this.props.navigation.goBack();
  _navigateToUserBoard = (id) => this.props.navigation.navigate('UserBoards', { id });
  render() {
    const id = this.props.navigation.getParam('id');
    return (
      <Profile
        id={id}
        goBack={this._goBack}
        navigateToUserBoards={this._navigateToUserBoard}
      />
    )
  }
}