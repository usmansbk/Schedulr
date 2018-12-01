import React from 'react';
import { View, StyleSheet } from 'react-native';
import StarButton from '../StarButton';
import ShareButton from '../ShareButton';
import CommentButton from '../CommentButton';
import AlarmButton from '../AlarmButton';

import colors from '../../../config/colors';

const FONT_SIZE = 24;
const defaultColor = colors.primary_light;

export default ({
  alarmSet,
  start,
  date,
  title,
  starred,
  starsCount,
  commentsCount,
  location,
  type,
  id,
  size,
  dark,
  navigateToComments,
}) => {
  const color = dark ? colors.light_gray_3 : defaultColor;
  return (
  <View style={styles.actions}>
    <StarButton
      id={id}
      starred={starred}
      starsCount={starsCount}
      activeColor={defaultColor}
      iconSize={size}
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
    <AlarmButton
      id={id}
      title={title}
      alarmSet={alarmSet}
      start={start}
      color={color}
      size={FONT_SIZE}
    />
    {
      size !== 'small' && (
        <ShareButton
          color={color}
          id={id}
          date={date}
          type={type}
          title={title}
          location={location}
          size={FONT_SIZE}
        />
      )
    }
  </View>
)};

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
