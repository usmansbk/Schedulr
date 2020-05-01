import React from 'react';
import { View } from 'react-native';
import Image from 'react-native-fast-image';
import { I18n } from 'aws-amplify';
import { Headline } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import Error from 'components/common/Error';
import Loading from 'components/common/Loading';

export default inject('stores')(observer(
  ({ error, loading, stores, onRefresh }) =>{
    if (loading) return <Loading />;
    if (error) return <Error onRefresh={onRefresh} />;
    return (
      <View style={stores.appStyles.eventsList.empty}>
        <Image resizeMode="contain" style={{ width: 200, height: 200 }} source={require('../../../assets/photographer.png')} />
        <Headline style={stores.appStyles.eventsList.emptyTitle}>
          {I18n.get("TEXT_noAlbum")}
        </Headline>
      </View>
    );  
  }
))