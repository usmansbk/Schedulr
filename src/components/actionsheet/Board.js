import React from 'react';
import ActionSheet from 'react-native-actionsheet';
import Share from 'react-native-share';
import OpenDialog from 'components/dialogs/OpenBoard';
import CloseDialog from 'components/dialogs/CloseBoard';
import env from 'config/env';

export default class EventAction extends React.Component {
  state = {
    visibleDialog: null
  };

  showActionSheet = () => {
    this.actionSheet.show();
  };

  _handleShare = () => {
    const { id, name } = this.props;
    const shareOptions = {
      title: 'Share invite link via...',
      subject: 'Follow group to see latest events',
      message: `Follow "${name}" to see their latest events, receive updates and get reminders.\n`,
      url: `${env.APP_URL}/board/${id}`
    };
    Share.open(shareOptions);
  };
  
  _toggleMute = () => this.props.onMute(this.props.id);

  _hideDialog = () => this.setState({ visibleDialog: null });

  _handleActionSheet = (index) => {
    const { isAuthor, isClosed } = this.props;
    if (isAuthor) {
      switch (index) {
        case 0:
          this._handleShare();
          break;
        case 1:
          this._toggleMute();
          break;
        case 2:
          this.setState({ visibleDialog: isClosed ? 'open' : 'close' });
          break;
      }
    } else {
      switch(index) {
        case 0:
          this._handleShare();
          break;
          case 1:
            this._toggleMute();
            break;
      }
    }
  }

  render() {
    const {
      id,
      title,
      isAuthor,
      isClosed,
      isMuted,
    } = this.props;
    const { visibleDialog } = this.state;

    const options = ['Back'];
    if (isAuthor) {
      options.unshift(isClosed ? 'Open group' : 'Close group');
    }
    options.unshift(
      'Share invite link',
      isMuted ? 'Unmute events' : 'Mute events',
    );
    const cancelButtonIndex = options.length - 1;
    const destructiveButtonIndex = isAuthor ? cancelButtonIndex - 1 : undefined;

    return (
      <>
      <ActionSheet
        ref={ref => this.actionSheet = ref}
        title={title}
        options={options}
        cancelButtonIndex={cancelButtonIndex}
        destructiveButtonIndex={destructiveButtonIndex}
        onPress={this._handleActionSheet}
      />
      <OpenDialog
        id={id}
        visible={visibleDialog === 'open' }
        handleDismiss={this._hideDialog}
      />
      <CloseDialog
        id={id}
        visible={visibleDialog === 'close' }
        handleDismiss={this._hideDialog}
      />
      </>
    )
  }

}