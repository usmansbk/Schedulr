import React from 'react';
import Fab from '../Fab';

export default ({
  style,
  isFollowing,
}) => (
  <Fab
    icon={isFollowing ? "check" : "add"}
    label={isFollowing ? "Following" : "Follow"}
  />
);
