import React from 'react';
import { View, StyleSheet } from 'react-native';
import StarButton from '../../common/StarButton';
import CommentButton from '../../common/CommentButton';
import LocationButton from '../../common/LocationButton';

import colors from '../../../config/colors';

const FONT_SIZE = 24;
const color = colors.primary_dark;

export default ({
  starred,
  starsCount,
  commentsCount,
  location
}) => (
  <View style={styles.actions}>
    <StarButton
      starred={starred}
      starsCount={starsCount}
      size={FONT_SIZE}
      color={color}
    />
    <CommentButton
      commentsCount={commentsCount}
      size={FONT_SIZE}
      color={color}
    />
    <LocationButton
      location={location}
      size={FONT_SIZE}
      color={color}
    />
  </View>
);

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
})