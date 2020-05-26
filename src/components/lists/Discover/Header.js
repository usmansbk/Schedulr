import React from 'react';
import { View } from 'react-native';
import {
  TouchableRipple,
  Searchbar,
  Divider,
  IconButton
} from 'react-native-paper';
import { I18n } from 'aws-amplify';
import Icon from 'components/common/Icon';
import Chips from 'components/lists/Chips';
import { inject, observer } from 'mobx-react';
import { ellipsisMode } from 'lib/utils';

export default inject('stores')(observer(
  ({navigation, stores, onPressLocationButton }) => {
    return (
      <>
      <TouchableRipple
        onPress={() => navigation.navigate('SearchScreen')}
      >
        <View style={{
          flexDirection: 'row',
          backgroundColor: stores.themeStore.colors.white,
        }}>
          <Searchbar
            icon={({ size, color }) => <Icon
              name="search"
              size={size}
              color={color}
            />}
            iconColor={stores.themeStore.colors.primary}
            editable={false}
            collapsable
            placeholder={ellipsisMode(I18n.get("SEARCH_inputPlaceholder")(stores.locationStore.searchLocation))}
            theme={{ roundness: 0 }}
            style={{
              backgroundColor: stores.themeStore.colors.white,
              elevation: 0,
              flex: 1
            }}
          />
          <IconButton
            size={22}
            color={stores.themeStore.colors.primary}
            onPress={onPressLocationButton}
            icon={({ size, color }) => <Icon
              name="map"
              size={size}
              color={color}
             />
            }
          />
        </View>
      </TouchableRipple>
      <Divider />
      <Chips data={stores.appState.categories} />
      <Divider />
      </>
    );
  }
));