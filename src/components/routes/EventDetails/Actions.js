import React from 'react';
import { IconButton } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import colors from '../../../config/colors';

const FONT_SIZE = 24;
const color = colors.primary_dark;
const handlePress = () => console.log('action');

export default ({
  starred,
  starsCount,
  commentsCount,
  location
}) => (
  <View style={styles.actions}>
    <IconButton
      icon={`star${starred ? '' : '-border'}`}
      size={FONT_SIZE}
      color={color}
      onPress={handlePress}
    />
    <IconButton
      icon="chat"
      size={FONT_SIZE}
      color={color}
      onPress={handlePress}
    />
    <IconButton
      icon={`location-${location ? 'on' : 'off' }`}
      size={FONT_SIZE}
      color={color}
      onPress={handlePress}
    />
  </View>
);

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
})