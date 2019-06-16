import React from 'react';
import ActionSheet from 'react-native-actionsheet';
import Share from 'react-native-share';
import env from 'config/env';

export default class EventAction extends React.Component {
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
    Share.open(shareOptions);
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
      />
    )
  }

}