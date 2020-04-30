import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import colors from 'config/colors';
import { badge } from 'lib/constants';
import UserAvatar from '../UserAvatar';

  const {
    SIZE
  } = badge;

export default ({ status, size=SIZE, src, name }) => {

  const styles = StyleSheet.create({
    container: {
      height: size,
      width: size,
      borderRadius: size / 2,
      borderWidth: 1,
      borderColor: 'white',
      justifyContent: 'center',
      alignItems: 'center'
    },
    cancelled: {
      backgroundColor: colors.error,
    },
    ongoing: {
      backgroundColor: colors.success
    },
    done: {
      backgroundColor: colors.tint
    },
    concluded: {
      backgroundColor: colors.tint
    },
    upcoming: {
      backgroundColor: colors.warning,
    },
  });
  let statusStyle = styles[status];
  return (
    <View style={[styles.container, statusStyle]}>
      {(src || name) && <UserAvatar src={src} name={name} size={size} />}
    </View>
  )
}