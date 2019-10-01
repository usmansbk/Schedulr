import React from 'react';
import { TouchableRipple, Searchbar } from 'react-native-paper';
import { I18n } from 'aws-amplify';
import Icon from 'react-native-vector-icons/Feather';
import { inject, observer } from 'mobx-react';

export default inject('stores')(observer(
  ({navigation, stores }) => {
    return (
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
          placeholder={I18n.get("SEARCH_inputPlaceholder")(stores.locationStore.locality)}
          theme={{ roundness: 0 }}
          style={{
            backgroundColor: stores.themeStore.colors.bg,
            elevation: 0
          }}
        />
      </TouchableRipple>
    );
  }
));