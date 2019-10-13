import React from 'react';
import { TouchableRipple, Searchbar, Divider } from 'react-native-paper';
import { I18n } from 'aws-amplify';
import Icon from 'react-native-vector-icons/Feather';
import Chips from 'components/lists/Chips';
import { inject, observer } from 'mobx-react';

export default inject('stores')(observer(
  ({navigation, stores, onPressLocationButton }) => {
    return (
      <>
      <TouchableRipple
        onPress={() => navigation.navigate('SearchScreen')}
      >
        <Searchbar
          icon={({ size, color }) => <Icon
            name="search"
            size={size}
            color={color}
          />}
          editable={false}
          collapsable
          placeholder={I18n.get("SEARCH_inputPlaceholder")(stores.locationStore.searchLocation)}
          theme={{ roundness: 0 }}
          style={{
            backgroundColor: stores.themeStore.colors.bg,
            elevation: 0,
          }}
          numberOfLines={1}
        />
      </TouchableRipple>
      <Divider />
      <Chips
        data={['__current__location__', ...stores.appState.categories]}
        onPressLocationButton={onPressLocationButton}
      />
      <Divider />
      </>
    );
  }
));