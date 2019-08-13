import React from 'react';
import IconBadge from '../IconBadge';

export default class Button extends React.Component {

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
      console.log(error);
    }
  };

  render() {
    const {
      color,
      size,
      activeColor,
      bookmarksCount,
      isBookmarked,
    } = this.props;

    return (
      <IconBadge
        icon="bookmark"
        onPress={this._onPress}
        size={size}
        count={bookmarksCount}
        color={isBookmarked ? activeColor : color}
      />
    );
  }
}