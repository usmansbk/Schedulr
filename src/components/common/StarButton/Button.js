import React from 'react';
import IconBadge from '../IconBadge';

export default ({
  color,
  size,
  activeColor,
  starred,
  starsCount,
  id,
  onPress
}) => (
  <IconBadge
    icon={`star${starred ? '' : '-border'}`}
    onPress={() => onPress && onPress(id)}
    size={size}
    color={starred ? activeColor : color}
    count={starsCount}
  />
);
