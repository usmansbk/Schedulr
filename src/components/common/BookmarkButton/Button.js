import React from 'react';
import IconBadge from '../IconBadge';

export default class Button extends React.Component {

  _onContinue = async () => {
    const {
      id,
      isBookmarked,
      bookmarksCount,
      onUnbookmarkEvent,
      onBookmarkEvent,
      onUnbookmarkComplete
    } = this.props;
    const input = { id };
    const prev = { isBookmarked, bookmarksCount };
    try {
      if (isBookmarked) {
        if (onUnbookmarkComplete) await onUnbookmarkComplete();
        await onUnbookmarkEvent(input, prev);
      } else {
        await onBookmarkEvent(input, prev);
      }
    } catch (error) {
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