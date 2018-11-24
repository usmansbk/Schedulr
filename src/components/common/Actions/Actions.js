import React from 'react';
import { View, StyleSheet } from 'react-native';
import StarButton from '../StarButton';
import ShareButton from '../ShareButton';
import CommentButton from '../CommentButton';
import MapsButton from '../MapsButton';

import colors from '../../../config/colors';

const FONT_SIZE = 24;
const defaultColor = colors.primary_dark;

export default ({
  title,
  starred,
  starsCount,
  commentsCount,
  location,
  type,
  date,
  id,
  size,
  dark,
  navigateToComments,
}) => {
  const fontSize = size === 'small' ? 20 : FONT_SIZE;
  const color = dark ? colors.gray : defaultColor;
  return (
  <View style={styles.actions}>
    <StarButton
      id={id}
      starred={starred}
      starsCount={starsCount}
      activeColor={defaultColor}
      iconSize={size}
      size={fontSize}
      color={color}
    />
    <CommentButton
      id={id}
      commentsCount={commentsCount}
      size={fontSize}
      color={color}
      onPress={() => navigateToComments(id)}
    />
    <MapsButton
      color={color}
      location={location}
      size={fontSize}
    />
    {
      (size !== 'small') && (
        <ShareButton
          color={color}
          id={id}
          type={type}
          title={title}
          location={location}
          date={date}
          size={fontSize}
        />
      )
    }
  </View>
)};

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8
  }
});
