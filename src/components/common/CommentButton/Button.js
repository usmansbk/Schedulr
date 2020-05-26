import React from 'react';
import IconBadge from '../IconBadge';

export default ({ color, size, commentsCount, onPress, disabled}) => (
  <IconBadge
    icon="comments"
    onPress={onPress}
    size={size}
    color={color}
    count={commentsCount}
    disabled={disabled}
  />
);
