import React from 'react';
import IconBadge from '../IconBadge';

export default ({ color, size, commentsCount, onPress}) => (
  <IconBadge
    icon="comment"
    onPress={onPress}
    size={size - 2}
    color={color}
    count={commentsCount}
  />
);
