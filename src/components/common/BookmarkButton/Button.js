import React from 'react';
import IconBadge from '../IconBadge';

export default class Button extends React.Component {

  _onContinue = async () => {
    const {
      id,
      stores,
      isBookmarked,
      bookmarksCount,
      onUnbookmarkEvent,
      onBookmarkEvent,
      // onUnbookmarkComplete
    } = this.props;
    const input = {
      id: `${stores.appState.userId}-${id}`,
      bookmarkEventId: id,
    };
    const prev = { isBookmarked, bookmarksCount };
    try {
      if (isBookmarked) {
        if (onUnbookmarkComplete) await onUnbookmarkComplete();
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
      color,
      size,
      activeColor,
      isBookmarked,
      bookmarksCount,
    } = this.props;

    return (
      <IconBadge
        icon="bookmark"
        onPress={this._onContinue}
        size={size}
        count={bookmarksCount}
        color={isBookmarked ? activeColor : color}
      />
    );
  }
}