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
      isFollowing,
      small,
      disabled
    } = this.props;
    const label = small ? undefined : (isFollowing ? "Following" : "Follow");
    return (
      <Fab
        icon={isFollowing ? "check" : "add"}
        label={label}
        onPress={this._onPress}
        small={small}
        disabled={disabled}
      />
    );
  }
}
