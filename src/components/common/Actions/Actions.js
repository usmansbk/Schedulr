import React from 'react';
import { View, StyleSheet } from 'react-native';
import BookmarkButton from '../BookmarkButton';
import ShareButton from '../ShareButton';
import LocationButton from '../LocationButton';
import CommentButton from '../CommentButton';

const DEFAULT_FONT_SIZE = 22;

export default class Actions extends React.Component {

  shouldComponentUpdate = (nextProps) => (
    (this.props.date !== nextProps.date) ||
    (this.props.title !== nextProps.title) ||
    (this.props.commentsCount !== nextProps.commentsCount) ||
    (this.props.isBookmarked !== nextProps.isBookmarked) ||
    (this.props.address !== nextProps.address) ||
    (this.props.color !== nextProps.color) ||
    (this.props.activeColor !== nextProps.activeColor)
  );

  _onPressCommentButton = () => {
    const { id, title, navigateToComments } = this.props;
    navigateToComments(id, title);
  };
  navigateToBookmarks = id => this.props.navigateToBookmarks && this.props.navigateToBookmarks(id);

  render() {
    const {
      date,
      title,
      isAuth,
      isBookmarked,
      bookmarksCount,
      bookmarkScheduleId,
      commentsCount,
      address,
      category,
      id,
      small,
      color,
      activeColor,
      size
    } = this.props;
    
    const FONT_SIZE = size || DEFAULT_FONT_SIZE;
    return (
      <View style={styles.actions}>
        <BookmarkButton
          id={id}
          isBookmarked={isBookmarked}
          bookmarksCount={bookmarksCount}
          bookmarkScheduleId={bookmarkScheduleId}
          onLongPress={this.navigateToBookmarks}
          activeColor={activeColor}
          size={FONT_SIZE}
          color={color}
          small={small}
        />
        <CommentButton
          id={id}
          commentsCount={commentsCount}
          size={FONT_SIZE}
          color={color}
          disabled={!isAuth}
          onPress={this._onPressCommentButton}
        />
        <LocationButton
          address={address}
          color={color}
          size={FONT_SIZE}
        />
        {
          !small && (
            <ShareButton
              color={color}
              id={id}
              date={date}
              category={category}
              title={title}
              address={address}
              size={FONT_SIZE}
            />
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent'
  }
});
