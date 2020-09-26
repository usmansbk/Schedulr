import React from 'react';
import {View} from 'react-native';
import Chips from 'components/lists/Chips';
import {Text} from 'react-native-paper';
import {inject, observer} from 'mobx-react';
import {I18n} from 'aws-amplify';

export default inject('stores')(
  observer(({stores, onPressLocationButton}) => {
    return (
      <View style={{marginBottom: 16}}>
        <Chips data={stores.appState.categories} />
        <View style={{margin: 16}}>
          <Text style={{fontSize: 18, marginBottom: 8}}>
            {I18n.get('PLACEHOLDER_whatsHappening')}
          </Text>
          <Text
            style={{fontFamily: 'ExtraBold', fontSize: 24}}
            onPress={onPressLocationButton}>
            {stores.location.locality || I18n.get('PLACEHOLDER_pickLocation')}
          </Text>
        </View>
      </View>
    );
  }),
);
