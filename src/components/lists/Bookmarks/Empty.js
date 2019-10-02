import React from 'react';
import { View, Image } from 'react-native';
import { I18n } from 'aws-amplify';
import { Headline } from 'react-native-paper';
import { inject, observer } from 'mobx-react';

export default inject('stores')(observer(
  ({ error, loading, stores }) =>{
    return (
      <View style={stores.appStyles.bookmarkedEventsList.empty}>
        { loading ? <Image resizeMode="contain" style={{ width: 200, height: 200 }} source={require('../../../assets/food-delivery.png')} /> : (
          <Image resizeMode="contain" style={{ width: 200, height: 200 }} source={require('../../../assets/support-woman.png')} />
        )}
        {
          !loading && <Headline style={stores.appStyles.bookmarkedEventsList.emptyTitle}>
          {
            I18n.get("BOOKMARKS_emptyList")
          }
          </Headline>
        }
      </View>
    );  
  }
))