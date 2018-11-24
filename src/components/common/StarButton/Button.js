import React from 'react';
import IconBadge from '../IconBadge';

export default ({
  color,
  size,
  activeColor,
  starred,
  starsCount,
  id
}) => (
  <IconBadge
    icon={`star${starred ? '' : '-border'}`}
    onPress={() => alert('Starred ' + id)}
    size={size}
    color={starred ? activeColor : color}
    count={starsCount}
  />
);
