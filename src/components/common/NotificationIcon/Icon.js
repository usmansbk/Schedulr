import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../config/colors';

export default ({ name, hasNotification, color, focused, size }) => {
  if (hasNotification && !focused) return (
    <Icon
      name="notifications-active"
      color={colors.light_red}
      size={size}
    />
  );
  return <Icon name={name} size={size} color={color}/>
};
