import React from 'react';
import IconBadge from '../IconBadge';

export default ({ color, commentsCount, onPress}) => (
  <IconBadge
    icon="chat-bubble-outline"
    onPress={onPress}
    size={20}
    color={color}
    count={commentsCount}
  />
);
