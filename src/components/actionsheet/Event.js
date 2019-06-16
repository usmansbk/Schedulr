import React from 'react';
import { InteractionManager } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import Share from 'react-native-share';
import gql from 'graphql-tag';
import client from 'config/client';
import { starEvent, unstarEvent } from 'mygraphql/mutations';
import { toggleStarButton } from 'helpers/optimisticResponse';
import env from 'config/env';


export default class EventAction extends React.Component {
  showActionSheet = () => {
    this.actionSheet.show();
  };

  _handleShare = () => {
    const {
      title,
      eventType,
      date,
      address,
      id
    } = this.props;

    const shareOptions = {
      title: 'Invite via...',
      subject: eventType,
      message: `${title}\n${eventType}\n${date}${address ? (' at ' + address) : ''}\n`,
      url: `${env.APP_URL}/event/${id}`
    };
    Share.open(shareOptions);
  }

  _handleStar = () => {
    const { isStarred, starsCount, id } = this.props;
    const input = { id };
    const prev = { isStarred, starsCount };
    client.mutate({
      mutation: gql(isStarred ? unstarEvent : starEvent),
      variables: {
        input
      },
      optimisticResponse: () => toggleStarButton(input, prev, isStarred ? 'unstarEvent' : 'starEvent'),
    }).catch(() => {
    });
  }

  _hideDialog = () => this.setState({ visibleDialog: null });

  _toggleMute = () => this.props.onMute(this.props.id);

  _handleActionSheet = (index) => {
    switch (index) {
      case 0:
        InteractionManager.runAfterInteractions(this._handleShare);
        break;
      case 1:
        InteractionManager.runAfterInteractions(this._toggleMute);
        break;
      case 2:
        InteractionManager.runAfterInteractions(this._handleStar);
        break;
    }
  }

  render() {
    const { 
      title,
      isStarred,
      isMuted,
    } = this.props;

    const options = ['Back'];
    options.unshift(
      'Share via',
      isStarred ? 'Remove bookmark' : 'Bookmark event',
      isMuted ? 'Unmute event' : 'Mute event'
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