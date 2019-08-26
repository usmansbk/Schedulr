import React from 'react';
import Fab from '../Fab';

export default class Button extends React.Component {
  _onPress = () => {
    const {
      id,
      stores,
      follow,
      unfollow,
      isFollowing,
    } = this.props;
    const input = {
      id: `${stores.appState.userId}-${id}`,
    };
    if (isFollowing) {
      // unfollow(input, id);
    } else {
      input.followScheduleId = id;
      // follow(input);
    }
    console.log(input);
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
