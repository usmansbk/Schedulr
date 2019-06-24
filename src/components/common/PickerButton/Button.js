import React from 'react';
import {
  TouchableRipple,
  Text,
} from 'react-native-paper';
import { inject, observer} from 'mobx-react';

export default inject('stores')(observer(({ stores, value, onPress }) => {
  const styles = stores.appStyles.picker;

  return (    
    <TouchableRipple
      onPress={onPress}
      style={styles.button}
    >
      <Text>{value}</Text>
    </TouchableRipple>
  )
}));