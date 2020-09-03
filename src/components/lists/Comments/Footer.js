import React from 'react';
import {View} from 'react-native';
import {inject, observer} from 'mobx-react';

export default inject('stores')(
  observer(({hide, loading, onPress, stores, hasMore}) => {
    return (
      // >
      <View style={stores.styles.eventsList.footerContainer}></View>
    );
  }),
);
