import React from 'react';
import { View, StyleSheet } from 'react-native';
import StarButton from '../StarButton';
import ShareButton from '../ShareButton';
import LocationButton from '../LocationButton';
import CommentButton from '../CommentButton';

import colors from '../../../config/colors';

const FONT_SIZE = 22;
const defaultColor = colors.primary_light;

export default class Actions extends React.Component {
  shouldComponentUpdate = (nextProps) => (
    (this.props.isStarred !== nextProps.isStarred) ||
    (this.props.date !== nextProps.date) ||
    (this.props.title !== nextProps.title) ||
    (this.props.commentsCount !== nextProps.commentsCount) ||
    (this.props.address !== nextProps.address)
  );
  
  render() {
    const {
      date,
      title,
      isStarred,
      starsCount,
      commentsCount,
      address,
      eventType,
      id,
      small,
      dark,
      navigateToComments,
      latitude,
      longitude,
      onRemove
    } = this.props;
    const color = dark ? colors.light_gray_3 : defaultColor;
    return (
      <View style={styles.actions}>
        <StarButton
          id={id}
          isStarred={isStarred}
          starsCount={starsCount}
          activeColor={defaultColor}
          size={FONT_SIZE}
          color={color}
          small={small}
          onUnstarComplete={onRemove}
        />
        <CommentButton
          id={id}
          commentsCount={commentsCount}
          size={FONT_SIZE}
          color={color}
          onPress={() => navigateToComments(id)}
        />
        <LocationButton
          address={address}
          latitude={latitude}
          longitude={longitude}
          color={color}
        />
        {
          small ? null : (
            <ShareButton
              color={color}
              id={id}
              date={date}
              eventType={eventType}
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
  }
});
