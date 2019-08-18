import React from 'react';
import Share from 'react-native-share';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { I18n } from 'aws-amplify';
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
    icon={() => <Icon
      size={size}
      name="share-2"
      color={color}
    />}
    size={size}
    onPress={() => {
      const shareOptions = {
        title: I18n.get("SHARE_EVENT_inviteTitle"),
        subject: category,
        message: `${title}\n${category ? category + '\n' : ''}${date}${address ? ('\n' + address) : ''}\n\n`,
        url: `${env.APP_URL}/event/${id}`
      };
      Share.open(shareOptions).catch(error => {
        // Ignore
      });
    }}
  />
);
