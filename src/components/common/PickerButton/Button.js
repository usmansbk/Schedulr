import React from 'react';
import {
  TouchableRipple,
  Text,
} from 'react-native-paper';
import { View } from 'react-native';
import { inject, observer} from 'mobx-react';

export default inject('stores')(observer(({ stores, value, onPress }) => {
  const styles = stores.appStyles.picker;

  return (    
    <TouchableRipple
      onPress={onPress}
      style={styles.container}
    >
      <View styles={styles.button}>
        <Text>{value}</Text>
      </View>
    </TouchableRipple>
  )
}));