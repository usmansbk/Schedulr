import React from 'react';
import { IconButton } from 'react-native-paper';
import Icon from 'components/common/Icon';
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
      name="share"
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
