import React from 'react';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/Feather';

const NotificationIcon = ({ name, color, size, stores }) => {
  return (
    <View>
      <Icon
        name={name}
        color={color}
        size={size}
      />
      {stores.notificationsStore.hasNotifications && (
        <View style={stores.appStyles.notifications.indicator}/> 
      )}
    </View>
  );
};

export default inject("stores")(observer(NotificationIcon));
