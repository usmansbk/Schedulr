import React from 'react';
import { View, StyleSheet } from 'react-native';
import BookmarkButton from '../BookmarkButton';
import ShareButton from '../ShareButton';
import LocationButton from '../LocationButton';
import CommentButton from '../CommentButton';

import colors from 'config/colors';

const FONT_SIZE = 22;
const defaultColor = colors.primary_light;

export default class Actions extends React.Component {
  shouldComponentUpdate = (nextProps) => (
    (this.props.isBookmarked !== nextProps.isBookmarked) ||
    (this.props.date !== nextProps.date) ||
    (this.props.title !== nextProps.title) ||
    (this.props.commentsCount !== nextProps.commentsCount) ||
    (this.props.address !== nextProps.address)
  );
  
  render() {
    const {
      date,
      title,
      isBookmarked,
      bookmarksCount,
      commentsCount,
      address,
      category,
      id,
      small,
      dark,
      navigateToComments,
    } = this.props;
    const color = dark ? colors.light_gray_3 : defaultColor;
    return (
      <View style={styles.actions}>
        <BookmarkButton
          id={id}
          isBookmarked={isBookmarked}
          bookmarksCount={bookmarksCount}
          activeColor={defaultColor}
          size={FONT_SIZE}
          color={color}
          small={small}
        />
        <CommentButton
          id={id}
          commentsCount={commentsCount}
          size={FONT_SIZE}
          color={color}
          onPress={() => navigateToComments(id, title)}
        />
        <LocationButton
          address={address}
          color={color}
        />
        {
          small ? null : (
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
