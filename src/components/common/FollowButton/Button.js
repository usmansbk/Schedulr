import React from 'react';
import Fab from '../Fab';

export default class Button extends React.Component {
  _onPress = () => {
    const {
      isFollowing,
      onFollowSchedule,
      onUnfollowSchedule
    } = this.props;
    if (isFollowing) onUnfollowSchedule();
    else onFollowSchedule();
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
        icon={isFollowing ? "check" : "plus"}
        label={label}
        onPress={this._onPress}
        small={small}
        disabled={disabled}
      />
    );
  }
}
