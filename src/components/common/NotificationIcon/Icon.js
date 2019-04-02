import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from 'config/colors';

export default ({ hasNotification, color, size }) => {
  return (
    <Icon
      name={`notifications${hasNotification ? '' : '-none'}`}
      color={hasNotification ? colors.light_red : color}
      size={size}
    />
  );
};
