import React from 'react';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import handleShareEvent from 'helpers/share';

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
      handleShareEvent({
        id,
        title,
        category,
        address,
        date
      })
    }}
  />
);
