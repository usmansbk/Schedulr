import React from 'react';
import IconBadge from '../IconBadge';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBookmarked: props.isBookmarked
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isBookmarked !== state.isBookmarked) {
      return {
        isBookmarked: props.isBookmarked
      }
    }
    return null;
  }

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
      activeColor,
      bookmarksCount
    } = this.props;
    const { isBookmarked } = this.state;

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