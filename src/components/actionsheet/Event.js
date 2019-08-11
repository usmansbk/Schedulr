import React from 'react';
import { InteractionManager } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import SimpleToast from 'react-native-simple-toast';
import Share from 'react-native-share';
import { inject, observer } from 'mobx-react';
import gql from 'graphql-tag';
import client from 'config/client';
import { bookmarkEvent, unbookmarkEvent } from 'api/mutations';
import { toggleBookmarkButton } from 'helpers/optimisticResponse';
import env from 'config/env';

class EventAction extends React.Component {
  showActionSheet = () => {
    this.actionSheet.show();
  };

  _handleShare = () => {
    const {
      title,
      category,
      date,
      address,
      id
    } = this.props;

    const shareOptions = {
      title: 'Share invite link via...',
      subject: category,
      message: `${title}\n${category}\n${date}${address ? (' at ' + address) : ''}\n`,
      url: `${env.APP_URL}/event/${id}`
    };
    Share.open(shareOptions).catch(error => {
      // Ignore
    });
  };

  _handleBookmark = () => {
    const { isBookmarked, bookmarksCount, id } = this.props;
    const input = { id };
    const prev = { isBookmarked, bookmarksCount };
    client.mutate({
      mutation: gql(isBookmarked ? unbookmarkEvent : bookmarkEvent),
      variables: {
        input
      },
      optimisticResponse: () => toggleBookmarkButton(input, prev, isBookmarked ? 'unbookmarkEvent' : 'bookmarkEvent'),
    }).catch(() => {
    });
    SimpleToast.show(`${isBookmarked ? "Removed" : "Bookmarked"}`, SimpleToast.SHORT);
  };

  _hideDialog = () => this.setState({ visibleDialog: null });

  _toggleMute = () => this.props.onMute(this.props.id);

  _handleActionSheet = (index) => {
    switch (index) {
      case 0:
        InteractionManager.runAfterInteractions(this._handleShare);
        break;
      case 1:
        InteractionManager.runAfterInteractions(this._handleBookmark);
        break;
      case 2:
        InteractionManager.runAfterInteractions(this._toggleMute);
        break;
    }
  };

  render() {
    const { 
      title,
      isBookmarked,
      isMuted,
      stores
    } = this.props;

    const options = ['Back'];
    options.unshift(
      'Share via',
      isBookmarked ? 'Remove bookmark' : 'Bookmark',
      isMuted ? 'Unmute' : 'Mute'
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

export default inject("stores")(observer(EventAction));