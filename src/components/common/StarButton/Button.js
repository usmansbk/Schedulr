import React from 'react';
import IconBadge from '../IconBadge';

export default ({
  color,
  size,
  starred,
  starsCount,
  id
}) => (
  <IconBadge
    icon={`star${starred ? '' : '-border'}`}
    onPress={() => alert('Starred ' + id)}
    size={size}
    color={color}
    count={starsCount}
  />
);
