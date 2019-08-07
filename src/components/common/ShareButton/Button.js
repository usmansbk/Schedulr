import React from 'react';
import Share from 'react-native-share';
import { IconButton } from 'react-native-paper';
import env from 'config/env';

export default ({
  size,
  color,
  id,
  title,
  category,
  address,
  date,
}) => (
  <IconButton
    icon="share"
    color={color}
    size={size}
    onPress={() => {
      const shareOptions = {
        title: 'Share event via...',
        subject: category,
        message: `${title}\n${category}\n${date}${address ? (' at ' + address) : ''}\n`,
        url: `${env.APP_URL}/event/${id}`
      };
      Share.open(shareOptions).catch(error => {
        // Ignore
      });
    }}
  />
);
