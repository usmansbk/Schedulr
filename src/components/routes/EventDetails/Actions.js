import React from 'react';
import { View, StyleSheet } from 'react-native';
import StarButton from '../../common/StarButton';
import ShareButton from '../../common/ShareButton';
import CommentButton from '../../common/CommentButton';
import MapsButton from '../../common/MapsButton';

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
    <MapsButton
      color={color}
    />
    <ShareButton
      color={color}
      id={id}
      title={title}
      location={location}
      date={date}
    />
  </View>
);

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});
