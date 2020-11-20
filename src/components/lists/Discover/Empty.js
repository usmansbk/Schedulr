import React from 'react';
import {View, Image} from 'react-native';
import {inject, observer} from 'mobx-react';

export default inject('stores')(
  observer(({stores}) => (
    <View style={stores.styles.discover.empty}>
      <Image
        resizeMode="contain"
        style={{width: 200, height: 200}}
        source={require('../../../assets/directions.png')}
      />
    </View>
  )),
);
