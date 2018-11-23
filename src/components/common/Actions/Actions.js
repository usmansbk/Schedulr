import React from 'react';
import { View, StyleSheet } from 'react-native';
import StarButton from '../StarButton';
import ShareButton from '../ShareButton';
import CommentButton from '../CommentButton';
import MapsButton from '../MapsButton';

import colors from '../../../config/colors';

const FONT_SIZE = 24;
const activeColor = colors.primary_dark;

export default ({
  title,
  starred,
  starsCount,
  commentsCount,
  location,
  type,
  date,
  id,
  mode,
  navigateToComments,
}) => (
  <View style={styles.actions}>
    <StarButton
      id={id}
      starred={starred}
      starsCount={starsCount}
      size={FONT_SIZE}
      color={activeColor}
      mode={mode}
    />
    <CommentButton
      id={id}
      commentsCount={commentsCount}
      size={FONT_SIZE}
      color={activeColor}
      onPress={() => navigateToComments(id)}
    />
    <MapsButton
      color={activeColor}
      location={location}
      size={FONT_SIZE}
    />
    <ShareButton
      color={activeColor}
      id={id}
      type={type}
      title={title}
      location={location}
      date={date}
      size={FONT_SIZE}
    />
  </View>
);

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8
  }
});
