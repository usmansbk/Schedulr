import React from 'react';
import IconBadge from '../IconBadge';
import logger from 'config/logger';

export default class Button extends React.Component {
  shouldComponentUpdate = (nextProp) =>
    nextProp.isBookmarked !== this.props.isBookmarked;

  _onPress = async () => {
    const {
      id,
      stores,
      isBookmarked,
      removeBookmark,
      bookmarkEvent,
      bookmarkScheduleId,
    } = this.props;

    this.timer = setTimeout(async () => {
      const input = {
        id: `${stores.appState.userId}-${id}`,
      };
      try {
        if (isBookmarked) {
          await removeBookmark(input, id);
        } else {
          input.bookmarkEventId = id;
          input.bookmarkScheduleId = bookmarkScheduleId;
          await bookmarkEvent(input);
        }
      } catch (error) {
        logger.logError(error);
      }
    }, 0);
  };

  componentWillUnmount = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  render() {
    const {size, bookmarksCount, isBookmarked, stores} = this.props;
    const count = isBookmarked && bookmarksCount === 1 ? 0 : bookmarksCount;
    const activeColor = stores.theme.colors.like;
    const color = stores.theme.colors.gray;

    return (
      <IconBadge
        icon={`bookmark${isBookmarked ? '' : 'o'}`}
        onPress={this._onPress}
        size={size}
        count={count}
        color={isBookmarked ? activeColor : color}
        activeColor={isBookmarked ? activeColor : color}
      />
    );
  }
}
