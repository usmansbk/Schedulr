import React from 'react';
import { View } from 'react-native';
import colors from 'config/colors';

export default (props) => {
  const SIZE = props.size;

  return (
    <View style={{
      backgroundColor: colors.image_loading,
      borderRadius: SIZE / 2,
      height: SIZE,
      width: SIZE
    }}/>
  );
};
