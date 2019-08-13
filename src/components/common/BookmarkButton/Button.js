import React from 'react';
import IconBadge from '../IconBadge';

export default class Button extends React.Component {

  _onContinue = async () => {
    const {
      id,
      stores,
      isBookmarked,
      removeBookmark,
      bookmarkEvent,
    } = this.props;
    const input = {
      id: `${stores.appState.userId}-${id}`,
      bookmarkEventId: id,
    };
    try {
      if (isBookmarked) {
        await removeBookmark(input);
      } else {
        await bookmarkEvent(input);
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