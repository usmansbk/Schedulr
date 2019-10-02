import React from 'react';
import { View, Image } from 'react-native';
import { Headline } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';

export default inject('stores')(observer(
  ({ stores, loading }) => {
    return (
      <View style={stores.appStyles.scheduleSearch.empty}>
        {
          loading ? <Image resizeMode="contain" style={{ width: 200, height: 200 }} source={require('../../../assets/food-delivery.png')} /> : (
            <Image resizeMode="contain" style={{ width: 200, height: 200 }} source={require('../../../assets/hiker-man.png')} />
          )
        }
        
        <Headline style={stores.appStyles.scheduleSearch.emptyTitle}>{I18n.get("SEARCH_emptyList")}</Headline>
      </View>
    );
  }
));
