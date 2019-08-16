import React from 'react';
import Fab from '../Fab';

export default class Button extends React.Component {
  _onPress = () => {
    const {
      id,
      stores,
      follow,
      unfollow
    } = this.props;
    const isFollowing = stores.appState.isFollowing(id);
    
    const input = {
      id: `${stores.appState.userId}-${id}`,
    };
    if (isFollowing) {
      unfollow(input);
    } else {
      input.followScheduleId = id;
      follow(input);
    }
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
