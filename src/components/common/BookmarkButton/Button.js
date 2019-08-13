import React from 'react';
import IconBadge from '../IconBadge';

export default class Button extends React.Component {

  _onContinue = async () => {
    const {
      id,
      stores,
      isBookmarked,
      onUnbookmarkEvent,
      onBookmarkEvent,
    } = this.props;
    const input = {
      id: `${stores.appState.userId}-${id}`,
      bookmarkEventId: id,
    };
    try {
      if (isBookmarked) {
        await onUnbookmarkEvent(input);
      } else {
        await onBookmarkEvent(input);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {
      id,
      color,
      size,
      activeColor,
      bookmarksCount,
      stores,
    } = this.props;

    return (
      <IconBadge
        icon="bookmark"
        onPress={this._onContinue}
        size={size}
        count={bookmarksCount}
        color={stores.appState.isBookmarked(id) ? activeColor : color}
      />
    );
  }
}