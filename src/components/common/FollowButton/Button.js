import React from 'react';
import { Alert } from 'react-native';
import { I18n } from 'aws-amplify';
import Fab from '../Fab';

export default class Button extends React.Component {
  _onPress = () => {
    const {
      id,
      name,
      stores,
      follow,
      unfollow,
      isFollowing,
    } = this.props;
    const input = {
      id: `${stores.appState.userId}-${id}`,
    };
    if (isFollowing) {
      Alert.alert(
        I18n.get("ALERT_unfollow")(name),
        I18n.get("ALERT_unfollowMessage"),
        [
          { text: I18n.get("BUTTON_cancel") },
          {
            text: I18n.get("BUTTON_unfollow"),
            onPress: () => unfollow(input, id),
            style: 'destructive'
          }
        ]
      )
      // unfollow(input, id);
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
