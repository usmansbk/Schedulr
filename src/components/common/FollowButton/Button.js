import React from 'react';
import Alert from 'components/dialogs/Alert';
import { I18n } from 'aws-amplify';
import Fab from '../Fab';

export default class Button extends React.Component {
  _unfollow = (input, id) => this.props.unfollow(input, id);
  _onPress = () => {
    const {
      id,
      stores,
      follow,
      isFollowing,
    } = this.props;
    const input = {
      id: `${stores.appState.userId}-${id}`,
    };
    if (isFollowing) {
      this._showUnfollowAlert(input, id);
    } else {
      input.followScheduleId = id;
      follow(input);
    }
  };

  render() {
    const {
      isFollowing,
      name,
      small,
      disabled
    } = this.props;
    const label = small ? undefined : (isFollowing ? "Following" : "Follow");
    return (
      <>
      <Fab
        icon={isFollowing ? "check" : "plus"}
        label={label}
        onPress={this._onPress}
        small={small}
        disabled={disabled}
      />
      <Alert
        title={I18n.get("ALERT_unfollow")(name)}
        message={I18n.get("ALERT_unfollowMessage")}
        confirmText={I18n.get("BUTTON_unfollow")}
        onConfirm={this._unfollow}
      />
      </>
    );
  }
}
