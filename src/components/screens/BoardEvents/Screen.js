import React from 'react';
import BoardEvents from '../../routes/BoardEvents';

export default class Screen extends React.Component {
  _onBack = () => this.props.navigation.goBack();
  _navigateToBoardInfo = (id) => this.props.navigation.navigate('BoardInfo', { id });
  _navigateToNewEvent = (boardId) => this.props.navigation.navigate('NewEvent', { boardId });

  render() {
    const id = this.props.navigation.getParam('id');
    return (
      <BoardEvents
        id={id}
        navigateToBoardInfo={this._navigateToBoardInfo}
        navigateToNewEvent={this._navigateToNewEvent}
        onPress={this._onBack}
      />
    );
  }
}
