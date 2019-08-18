import React from 'react';
import IconBadge from '../IconBadge';

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
        await removeBookmark(input);
      } else {
        input.bookmarkEventId = id,
        await bookmarkEvent(input);
      }
    } catch (error) {
      console.error(error);
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

    const count = (isBookmarked && (bookmarksCount > 1)) ? bookmarksCount : 0;

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