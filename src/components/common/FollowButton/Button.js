import React from 'react';
import Fab from '../Fab';

export default class Button extends React.Component {
  _onPress = () => {
    const {
      isFollowing,
      onFollowBoard,
      onUnfollowBoard
    } = this.props;
    if (isFollowing) onUnfollowBoard();
    else onFollowBoard();
  };

  render() {
    const {
      isFollowing
    } = this.props;
    return (
      <Fab
        icon={isFollowing ? "check" : "add"}
        label={isFollowing ? "Following" : "Follow"}
        onPress={this._onPress}
      />
    );
  }
}
