import React from 'react';
import {View} from 'react-native';
import {Headline} from 'react-native-paper';
import {inject, observer} from 'mobx-react';
import {I18n} from 'aws-amplify';
import Loading from 'components/common/Loading';
import Error from 'components/common/Error';

export default inject('stores')(
  observer(({stores, loading, error, onRefresh}) => {
    if (loading) return <Loading />;
    if (error) return <Error onRefresh={onRefresh} />;

    return (
      <View style={stores.styles.scheduleSearch.empty}>
        <Headline style={stores.styles.scheduleSearch.emptyTitle}>
          {I18n.get('SEARCH_emptyList')}
        </Headline>
      </View>
    );
  }),
);
