import React from 'react';
import numeral from 'numeral';
import { View } from 'react-native';
import { Badge } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/Feather';

const NotificationIcon = ({ name, color, size, stores }) => {
  return (
    <View style={{
      flexDirection: 'row',
    }}>
      <Icon
        name={name}
        color={color}
        size={size}
      />
      {!!stores.notificationsStore.count && (
        <Badge size={16} style={stores.appStyles.notifications.indicator}>
          {numeral(stores.notificationsStore.count).format('0a')}
        </Badge>
      )}
    </View>
  );
};

export default inject("stores")(observer(NotificationIcon));
