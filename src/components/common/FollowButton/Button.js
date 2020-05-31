import React from 'react';
import Confirm from 'components/common/Confirm';
import { I18n } from 'aws-amplify';
import Fab from '../Fab';

export default class Button extends React.Component {
  _actionsheetRef = ref => this.actionSheet = ref;
  _onPress= () => {
    if (this.props.isFollowing) {
      this.actionSheet.open(); 
    } else {
      this._onConfirm();
    }
  };
  _onConfirm = () => {
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
      unfollow(input, id);
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
        icon={isFollowing ? "pin" : "pino"}
        label={label}
        onPress={this._onPress}
        small={small}
        disabled={disabled}
      />
      <Confirm
        ref={this._actionsheetRef}
        title={I18n.get("ALERT_unfollow")(name)}
        message={I18n.get("ALERT_unfollowMessage")}
        confirmText={I18n.get("BUTTON_unfollow")}
        onConfirm={this._onConfirm}
      />
      </>
    );
  }
}
