import React from 'react';
import numeral from 'numeral';
import {View} from 'react-native';
import {Badge} from 'react-native-paper';
import {inject, observer} from 'mobx-react';
import Icon from 'components/common/Icon';

const NotificationIcon = ({name, color, size, stores}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      <Icon name={name} color={color} size={size} />
      <Badge
        visible={!!stores.notifications.count}
        allowFontScaling={false}
        size={16}
        style={stores.styles.notifications.indicator}>
        {numeral(stores.notifications.count || 3).format('0a')}
      </Badge>
    </View>
  );
};

export default inject('stores')(observer(NotificationIcon));
