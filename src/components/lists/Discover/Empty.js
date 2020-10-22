import React from 'react';
import {View, Image} from 'react-native';
import {Headline, Caption, Button} from 'react-native-paper';
import {inject, observer} from 'mobx-react';
import {I18n} from 'aws-amplify';
import Icon from 'components/common/Icon';

export default inject('stores')(
  observer(({stores}) => (
    <View style={stores.styles.discover.empty}>
      {stores.location.currentLocation ? (
        <>
          <Image
            resizeMode="contain"
            style={{width: 200, height: 200}}
            source={require('../../../assets/directions.png')}
          />
        </>
      ) : (
        <>
          <Headline style={stores.styles.discover.emptyTitle}>
            {I18n.get('DISCOVER_turnOnLocation')}
          </Headline>
          <Caption style={stores.styles.discover.paragraph}>
            {I18n.get('DISCOVER_locationUsage')}
          </Caption>
          <Button
            icon={({size, color}) => (
              <Icon name="map" size={size} color={color} />
            )}
            onPress={() => stores.location.fetchLocation()}>
            {I18n.get('BUTTON_turnOnLocation')}
          </Button>
        </>
      )}
    </View>
  )),
);
