import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Searchbar, IconButton} from 'react-native-paper';
import {I18n} from 'aws-amplify';
import Icon from 'components/common/Icon';
import Chips from 'components/lists/Chips';
import {inject, observer} from 'mobx-react';
import {ellipsisMode} from 'lib/utils';

export default inject('stores')(
  observer(({navigation, stores, onPressLocationButton}) => {
    return (
      <View style={{marginBottom: 16}}>
        <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: stores.theme.colors.bg,
            }}>
            <Searchbar
              icon={({size, color}) => (
                <Icon name="search" size={size} color={color} />
              )}
              iconColor={stores.theme.colors.primary}
              editable={false}
              collapsable
              placeholder={ellipsisMode(
                I18n.get('SEARCH_inputPlaceholder')(
                  stores.location.searchLocation,
                ),
              )}
              theme={{roundness: 0}}
              style={{
                backgroundColor: stores.theme.colors.bg,
                elevation: 0,
                flex: 1,
              }}
            />
            <IconButton
              size={22}
              color={stores.theme.colors.primary}
              onPress={onPressLocationButton}
              icon={({size, color}) => (
                <Icon name="map" size={size} color={color} />
              )}
            />
          </View>
        </TouchableOpacity>
        <Chips data={stores.appState.categories} />
      </View>
    );
  }),
);
