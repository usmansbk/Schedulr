import React from 'react';
import {Caption, ActivityIndicator} from 'react-native-paper';
import {View, TouchableOpacity} from 'react-native';
import {inject, observer} from 'mobx-react';
import 'twix';
import {I18n} from 'aws-amplify';
import Icon from 'components/common/Icon';

export default inject('stores')(
  observer(({loading, onPress, stores, hasMore, hide}) => {
    if (hide) return null;

    return (
      <TouchableOpacity
        disabled={!hasMore || loading}
        onPress={onPress}
        style={stores.appStyles.eventsList.footerContainer}>
        <View style={stores.appStyles.eventsList.footerContent}>
          {loading ? (
            <ActivityIndicator
              animating
              size={20}
              color={stores.themeStore.colors.primary}
              style={{
                margin: 4,
              }}
            />
          ) : hasMore ? (
            <Icon name="down" color={stores.themeStore.colors.gray} size={20} />
          ) : (
            <Caption style={stores.appStyles.eventsList.footerText}>
              {I18n.get(`EVENTS_SECTIONLIST_noMoreEvents`)}
            </Caption>
          )}
        </View>
      </TouchableOpacity>
    );
  }),
);
