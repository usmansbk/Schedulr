import React from 'react';
import { View, StyleSheet } from 'react-native';
import StarButton from '../StarButton';
import ShareButton from '../ShareButton';
import CommentButton from '../CommentButton';
import MapsButton from '../MapsButton';

import colors from '../../../config/colors';

const FONT_SIZE = 24;
const activeColor = colors.primary_dark;
const inactiveColor = colors.gray;

export default ({
  title,
  size,
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
      size={size}
      color={activeColor}
      inactiveColor={inactiveColor}
      mode={mode}
    />
    <CommentButton
      id={id}
      commentsCount={commentsCount}
      size={size}
      color={mode === 'item' ? inactiveColor : activeColor}
      onPress={() => navigateToComments(id)}
    />
    <MapsButton
      color={mode === 'item' ? inactiveColor : activeColor}
      location={location}
      size={size}
    />
    <ShareButton
      color={mode === 'item' ? inactiveColor : activeColor}
      id={id}
      type={type}
      title={title}
      location={location}
      date={date}
      size={size}
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
