import React from 'react';
import { View } from 'react-native';
import Image from 'react-native-fast-image';
import { Headline, Caption, Button } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import Icon from 'react-native-vector-icons/Feather';

export default inject('stores')(observer(
  ({ stores }) => (
    <View style={stores.appStyles.discover.empty}>
      {
        stores.locationStore.currentLocation ? (
        <>
        <Image resizeMode="contain" style={{ width: 200, height: 200 }} source={require('../../../assets/directions.png')} />
        <Headline style={stores.appStyles.discover.emptyTitle}>
          {I18n.get("DISCOVER_emptyList")}
        </Headline>
        <Caption style={stores.appStyles.discover.paragraph}>
          {I18n.get("DISCOVER_emptyListCaption")}
        </Caption>
        </>
        ) : (
          <>
            <Headline style={stores.appStyles.discover.emptyTitle}>
              {I18n.get("DISCOVER_turnOnLocation")}
            </Headline>
            <Caption style={stores.appStyles.discover.paragraph}>
              {I18n.get("DISCOVER_locationUsage")}
            </Caption>
            <Button
              icon={({ size, color }) => <Icon
                name="map-pin"
                size={size}
                color={color}
              />}
              onPress={stores.locationStore.fetchLocation}
            >
              {I18n.get("BUTTON_turnOnLocation")}
            </Button>
          </>
        )
      }
    </View>
  )
));
