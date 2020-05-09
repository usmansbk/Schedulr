import React from 'react';
import {
  TouchableRipple,
  Text,
} from 'react-native-paper';
import { inject, observer} from 'mobx-react';
import { I18n } from 'aws-amplify';

export default inject('stores')(observer(({ stores, value, onPress }) => {
  const styles = stores.appStyles.picker;

  return (    
    <TouchableRipple
      onPress={onPress}
      style={styles.button}
    >
      <Text style={styles.text}>{value || I18n.get("Normal")}</Text>
    </TouchableRipple>
  )
}));