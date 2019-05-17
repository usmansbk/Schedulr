import React from 'react';
import numeral from 'numeral';
import {
  Text,
  IconButton
} from 'react-native-paper';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react/native';

export default inject('stores')(observer(
  ({ color, icon, size, count, onPress, stores }) => (
    <View style={stores.appStyles.styles.button}>
      <IconButton
        onPress={onPress}
        icon={icon}
        size={size}
        color={color}
        style={stores.appStyles.styles.iconButton}
        animated
      />
      {
        Boolean(count) && (
          <Text style={stores.appStyles.styles.badge}>{count && numeral(count).format('0a')}</Text>
        )
      }
    </View>
  )
));
