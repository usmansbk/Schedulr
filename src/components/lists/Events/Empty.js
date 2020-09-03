import React from 'react';
import {View, Image} from 'react-native';
import {I18n} from 'aws-amplify';
import {Headline} from 'react-native-paper';
import {inject, observer} from 'mobx-react';
import Error from 'components/common/Error';
import Loading from 'components/common/Loading';

export default inject('stores')(
  observer(({error, loading, stores, onRefresh}) => {
    if (loading) return <Loading />;
    if (error) return <Error onRefresh={onRefresh} />;
    return (
      <View style={stores.styles.eventsList.empty}>
        <Image
          resizeMode="contain"
          style={{width: 200, height: 200}}
          source={require('../../../assets/calendar.png')}
        />
        <Headline style={stores.styles.eventsList.emptyTitle}>
          {I18n.get('EVENTS_emptyList')}
        </Headline>
      </View>
    );
  }),
);
