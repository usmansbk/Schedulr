import React from 'react';
import IconBadge from '../IconBadge';

export default ({ color, size, commentsCount, onPress, disabled}) => (
  <IconBadge
    icon="message-circle"
    onPress={onPress}
    size={size}
    color={color}
    count={commentsCount}
    disabled={disabled}
  />
);
