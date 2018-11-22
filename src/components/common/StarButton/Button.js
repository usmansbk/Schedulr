import React from 'react';
import IconBadge from '../IconBadge';

export default ({
  color,
  size,
  inactiveColor,
  starred,
  starsCount,
  mode,
  id
}) => (
  <IconBadge
    icon={`star${starred ? '' : '-border'}`}
    onPress={() => alert('Starred ' + id)}
    size={size || 25}
    color={(mode && !starred) ? inactiveColor : color}
    count={starsCount}
  />
);
