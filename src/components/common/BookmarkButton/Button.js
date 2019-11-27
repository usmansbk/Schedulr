import React from 'react';
import IconBadge from '../IconBadge';
import logger from 'config/logger';

export default class Button extends React.Component {

  shouldComponentUpdate = (nextProps) => {
    return nextProps.isBookmarked !== this.props.isBookmarked
  };

  _onPress = async () => {
    const {
      id,
      stores,
      isBookmarked,
      removeBookmark,
      bookmarkEvent,
    } = this.props;
    const input = {
      id: `${stores.appState.userId}-${id}`,
    };
    try {
      if (isBookmarked) {
        await removeBookmark(input, id);
      } else {
        input.bookmarkEventId = id,
        await bookmarkEvent(input);
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