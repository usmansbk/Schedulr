import React from 'react';
import { View, StyleSheet } from 'react-native';
import StarButton from '../../common/StarButton';
import CommentButton from '../../common/CommentButton';
import LocationButton from '../../common/LocationButton';
import ShareButton from '../../common/ShareButton';

import colors from '../../../config/colors';

const FONT_SIZE = 24;
const color = colors.primary_dark;

export default ({
  title,
  starred=true,
  starsCount="2K",
  commentsCount="1K",
  location,
  date,
  id,
}) => (
  <View style={styles.actions}>
    <StarButton
      id={id}
      starred={starred}
      starsCount={starsCount}
      size={FONT_SIZE}
      color={color}
    />
    <CommentButton
      id={id}
      commentsCount={commentsCount}
      size={FONT_SIZE}
      color={color}
    />
    <LocationButton
      id={id}
      location={location}
      size={FONT_SIZE}
      color={color}
    />
    <ShareButton
      id={id}
      title={title}
      location={location}
      color={color}
      date={date}
    />
  </View>
);

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
})