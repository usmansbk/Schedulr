import React from 'react';
import IconBadge from '../IconBadge';
import logger from 'config/logger';

export default class Button extends React.Component {

  shouldComponentUpdate = (nextProps) => {
    return nextProps.isBookmarked !== this.props.isBookmarked
  };

  _onPress = () => {
    const {
      id,
      stores,
      isBookmarked,
      removeBookmark,
      bookmarkEvent,
      bookmarkScheduleId,
    } = this.props;
    const input = {
      id: `${stores.appState.userId}-${id}`,
    };
    try {
      if (isBookmarked) {
        setTimeout(() => {
          removeBookmark(input, id);
        }, 0);
      } else {
        input.bookmarkEventId = id,
        input.bookmarkScheduleId = bookmarkScheduleId;
        setTimeout(() => {
          bookmarkEvent(input);
        }, 0);
      }
    } catch (error) {
      logger.logError(error);
    }
  };

  render() {
    const {
      color,
      size,
      isBookmarked,
      activeColor,
      bookmarksCount
    } = this.props;

    const count = (isBookmarked && (bookmarksCount === 1)) ? 0 : bookmarksCount;

    return (
      <IconBadge
        icon="bookmark"
        onPress={this._onPress}
        size={size}
        count={count}
        color={isBookmarked ? activeColor : color}
        activeColor={isBookmarked ? activeColor : color}
      />
    );
  }
}