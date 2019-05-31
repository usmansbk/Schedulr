import React from 'react';
import ActionSheet from 'react-native-actionsheet';
import Share from 'react-native-share';
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
      subject: 'Follow calendar to see latest events',
      message: `Follow "${name}" to see their latest events, receive updates and get reminders.\n`,
      url: `${env.APP_URL}/board/${id}`
    };
    Share.open(shareOptions);
  };

  _hideDialog = () => this.setState({ visibleDialog: null });

  _handleActionSheet = (index) => {
    const { isAuthor } = this.props;
    if (isAuthor) {
      switch (index) {
        case 0:
          this._handleShare();
          break;
        case 2:
          this.setState({ visibleDialog: 'cancel' });
          break;
      }
    } else {
      switch(index) {
        case 0:
          this._handleShare();
          break;
      }
    }
  }

  render() {
    const { 
      title,
      isAuthor,
      isClosed,
    } = this.props;
    const { visibleDialog } = this.state;

    const options = ['Back'];
    options.unshift('Share invite link');
    if (isAuthor) {
      options.unshift(isClosed ? 'Open calendar' : 'Close calendar');
    }
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
      </>
    )
  }

}