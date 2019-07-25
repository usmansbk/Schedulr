import React from 'react';
import ActionSheet from 'react-native-actionsheet';
import Share from 'react-native-share';
import { inject, observer } from 'mobx-react';
import env from 'config/env';

class BoardAction extends React.Component {
  showActionSheet = () => {
    this.actionSheet.show();
  };

  _handleShare = () => {
    const { id, name } = this.props;
    const shareOptions = {
      title: 'Share invite link via...',
      subject: 'Follow board to see latest events',
      message: `Follow "${name}" to see their latest events, receive updates and get reminders.\n`,
      url: `${env.APP_URL}/board/${id}`
    };
    Share.open(shareOptions).catch(error => {
      // Ignore
    });
  };
  
  _toggleMute = () => this.props.onMute(this.props.id);

  _handleActionSheet = (index) => {
    switch (index) {
      case 0:
        this._handleShare();
        break;
      case 1:
        this._toggleMute();
        break;
    }
  }

  render() {
    const {
      title,
      isMuted,
      stores
    } = this.props;

    const options = ['Back'];
    options.unshift(
      'Share invite link',
      isMuted ? 'Unmute events' : 'Mute events'
    );
    const cancelButtonIndex = options.length - 1;
    const destructiveButtonIndex = cancelButtonIndex - 1;

    return (
      <ActionSheet
        ref={ref => this.actionSheet = ref}
        title={title}
        options={options}
        cancelButtonIndex={cancelButtonIndex}
        destructiveButtonIndex={destructiveButtonIndex}
        onPress={this._handleActionSheet}
        styles={stores.appStyles.actionsheet}
      />
    )
  }

}

export default inject("stores")(observer(BoardAction));