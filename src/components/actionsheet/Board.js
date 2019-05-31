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

  _handleShare = ({ id, name }) => {
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
          break;s
      }
    } else {
      switch(index) {
        case 0:
          this._handleShare();
          break;
        case 1:
          this._handleStar();
          break;
      }
    }
  }

  render() {
    const { 
      title,
      isAuthor,
    } = this.props;
    const { visibleDialog } = this.state;

    const options = ['Back'];
    if (isAuthor) options.unshift('Cancel event');
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