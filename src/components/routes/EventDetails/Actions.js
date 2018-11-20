import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import StarButton from '../../common/StarButton';
import CommentButton from '../../common/CommentButton';
import LocationButton from '../../common/LocationButton';

import colors from '../../../config/colors';

const FONT_SIZE = 24;
const color = colors.primary_dark;

export default ({
  title,
  starred,
  starsCount,
  commentsCount,
  location,
  date,
  id,
  handleShare,
  navigateToComments,
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
      onPress={() => navigateToComments(id)}
    />
    <LocationButton
      id={id}
      location={location}
      size={FONT_SIZE}
      color={color}
    />
    <IconButton
      icon="share"
      onPress={() => handleShare({ location, id, title, date })}
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