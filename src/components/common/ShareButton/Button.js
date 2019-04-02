import React from 'react';
import Share from 'react-native-share';
import { IconButton } from 'react-native-paper';
import env from 'config/env';

export default ({
  size,
  color,
  id,
  title,
  eventType,
  address,
  date,
}) => (
  <IconButton
    icon="share"
    color={color}
    size={size}
    onPress={() => {
      const shareOptions = {
        title: 'Invite via...',
        subject: eventType,
        message: `${title}\n${eventType}\n${date}${address ? (' at ' + address) : ''}\n`,
        url: `${env.APP_URL}/event/${id}`
      };
      Share.open(shareOptions);
    }}
  />
);
