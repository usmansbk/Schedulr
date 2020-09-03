import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import {inject, observer} from 'mobx-react';

export default inject('stores')(
  observer(({stores, value, onPress}) => {
    const styles = stores.styles.picker;

    return (
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.text}>{value}</Text>
      </TouchableOpacity>
    );
  }),
);
