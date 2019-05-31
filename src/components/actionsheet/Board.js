import React from 'react';
import ActionSheet from 'react-native-actionsheet';
import SimpleToast from 'react-native-simple-toast';
import Share from 'react-native-share';
import gql from 'graphql-tag';
import CancelDialog from 'components/dialogs/CancelEvent';
import client from 'config/client';
import { starEvent, unstarEvent } from 'mygraphql/mutations';
// import { listAllEvents, getEvent } from 'mygraphql/queries';
import { toggleStarButton } from 'helpers/optimisticResponse';
import env from 'config/env';


export default class EventAction extends React.Component {
  state = {
    visibleDialog: null
  };

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
      // update: isStarred ? undefined : (cache, { data: { starEvent } }) => {
      //   const data = cache.readQuery({ query: gql(listAllEvents) });
      //   const eventNode = cache.readQuery({
      //    query: gql(getEvent),
      //    variables: {
      //      id
      //    }
      //   });
      //   if (eventNode.getEvent) {
      //     const event = Object.assign({}, eventNode.getEvent, starEvent);
      //     data.listAllEvents.items = [
      //       ...data.listAllEvents.items.filter(item => item.id !== starEvent.id),
      //       event
      //     ];
      //     cache.writeQuery({ query: gql(listAllEvents), data });
      //   }
      // },
    }).catch((error) => {
      SimpleToast.show('error', error.message);
    });
  }

  _hideDialog = () => this.setState({ visibleDialog: null });

  _handleActionSheet = (index) => {
    const { isAuthor } = this.props;
    if (isAuthor) {
      switch (index) {
        case 0:
          this._handleShare();
          break;
        case 1:
          this._handleStar();
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
      id,
      title,
      isFollowing,
      isAuthor,
      startAt,
      isRecurring,
    } = this.props;
    const { visibleDialog } = this.state;

    const options = ['Back'];
    if (isAuthor) options.unshift('Cancel event');
    options.unshift('Share via', isFollowing ? 'Unfollow' : 'Follow');
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