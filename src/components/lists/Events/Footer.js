import React from 'react';
import { ActivityIndicator } from 'react-native-paper';

export default ({ loading }) => {
  if (loading) return (
    <ActivityIndicator
      animating={loading}
      hideWhenStopped
      size="small"
    />
  );
  return null;
}
