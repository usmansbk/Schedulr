import React from 'react';
import {Caption, ActivityIndicator} from 'react-native-paper';
import {View, TouchableOpacity} from 'react-native';
import {inject, observer} from 'mobx-react';
import {I18n} from 'aws-amplify';

export default inject('stores')(
  observer(({visible, loading, onPress, stores, hasMore}) => {
    if (!visible) return null;
    return loading ? (
      <ActivityIndicator style={{margin: 8}} animating size={12} />
    ) : (
      <TouchableOpacity
        disabled={!hasMore}
        onPress={onPress}
        style={stores.styles.eventsList.footerContainer}>
        <View style={stores.styles.eventsList.footerContent}>
          <Caption style={stores.styles.eventsList.footerText}>
            {hasMore
              ? I18n.get('SEARCH_loadMore')
              : I18n.get('SEARCH_noMoreResults')}
          </Caption>
        </View>
      </TouchableOpacity>
    );
  }),
);
