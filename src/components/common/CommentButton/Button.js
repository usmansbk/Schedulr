import React from 'react';
import IconBadge from '../IconBadge';

export default ({ color, size, commentsCount, onPress}) => (
  <IconBadge
    icon="chat-bubble-outline"
    onPress={onPress}
    size={size - 2}
    color={color}
    count={commentsCount}
  />
);
