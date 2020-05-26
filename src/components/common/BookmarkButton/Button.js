import React from 'react';
import IconBadge from '../IconBadge';
import logger from 'config/logger';

export default class Button extends React.Component {
  state = {
    loading: false,
    isBookmarked: false
  };

  static getDerivedStateFromProps(props, state) {
    if ((props.isBookmarked !== state.isBookmarked) && !state.loading) {
      return {
        isBookmarked: props.isBookmarked,
        loading: state.loading
      };
    }
    return null;
  }

  shouldComponentUpdate = (_, nextState) => (
    nextState.isBookmarked !== this.state.isBookmarked);

  _onPress = async () => {
    const {
      id,
      stores,
      isBookmarked,
      removeBookmark,
      bookmarkEvent,
      bookmarkScheduleId,
    } = this.props;
    this.setState(
      prevState => ({
        loading: true,
        isBookmarked: !prevState.isBookmarked
      })
    );
    const { loading } = this.state;
    setTimeout(async () => {
      if (!loading) {
        const input = {
          id: `${stores.appState.userId}-${id}`,
        };
        try {
          if (isBookmarked) {
            await removeBookmark(input, id);
          } else {
            input.bookmarkEventId = id,
            input.bookmarkScheduleId = bookmarkScheduleId;
            await bookmarkEvent(input);
          }
        } catch (error) {
          logger.logError(error);
        }
        this.setState({ loading: false });
      }
    }, 0);
  };

  render() {
    const {
      color,
      size,
      activeColor,
      bookmarksCount
    } = this.props;
    const { isBookmarked } = this.state;

    const count = (this.props.isBookmarked &&
      (bookmarksCount === 1)) ? 0 : bookmarksCount;

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