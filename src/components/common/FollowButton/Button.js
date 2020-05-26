import React from 'react';
import Alert from 'components/dialogs/Alert';
import { I18n } from 'aws-amplify';
import Fab from '../Fab';

export default class Button extends React.Component {
  state = {
    showUnfollowAlert: false,
    input: null,
    id: null,
  };
  _showUnfollowAlert = (input, id) => this.setState({ showUnfollowAlert: true, input, id });
  _hideAlert = () => this.setState({ showUnfollowAlert: false });
  _unfollow = () => {
    this.props.unfollow(this.state.input, this.state.id);
    this._hideAlert();
  };
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
        icon={isFollowing ? "pin" : "pino"}
        label={label}
        onPress={this._onPress}
        small={small}
        disabled={disabled}
      />
      <Alert
        visible={this.state.showUnfollowAlert}
        title={I18n.get("ALERT_unfollow")(name)}
        message={I18n.get("ALERT_unfollowMessage")}
        confirmText={I18n.get("BUTTON_unfollow")}
        onConfirm={this._unfollow}
        handleDismiss={this._hideAlert}
      />
      </>
    );
  }
}
