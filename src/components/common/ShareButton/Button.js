import React from 'react';
import Share from 'react-native-share';
import { IconButton } from 'react-native-paper';
import env from '../../../config/env';

export default ({
  size,
  color,
  id,
  title,
  location,
  date,
}) => (
  <IconButton
    icon="share"
    color={color}
    size={size}
    onPress={() => {
      const shareOptions = {
        title,
        message: `${date}${location ? ('\n' + location) : ''}`,
        url: `${env.APP_URL}/event/${id}`
      };
      Share.shareSingle(shareOptions);
    }}
  />
);
