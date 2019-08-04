import React from 'react';
import IconBadge from '../IconBadge';

export default class Button extends React.Component {

  _onContinue = async () => {
    const {
      id,
      isBookmarked,
      bookmarksCount,
      onUnstarEvent,
      onStarEvent,
      onUnstarComplete
    } = this.props;
    const input = { id };
    const prev = { isBookmarked, bookmarksCount };
    try {
      if (isBookmarked) {
        if (onUnstarComplete) await onUnstarComplete();
        await onUnstarEvent(input, prev);
      } else {
        await onStarEvent(input, prev);
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
        icon={`bookmark${isBookmarked ? '' : '-border'}`}
        onPress={this._onContinue}
        size={size}
        color={isBookmarked ? activeColor : color}
        count={bookmarksCount}
      />
    );
  }
}