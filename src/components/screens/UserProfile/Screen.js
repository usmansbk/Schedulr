import React from 'react';
import Profile from './Hoc';

export default class Screen extends React.Component {
  _navigateToUserBoards = (id) => this.props.navigation.navigate('UserBoards', { id });
  _goBack = () => this.props.navigation.goBack();
  
  render() {
    const id = this.props.navigation.getParam('id');
    return (
      <Profile
        screenProps={id}
        goBack={this._goBack}
        navigateToUserBoards={this._navigateToUserBoards}
      />
    )
  }
}