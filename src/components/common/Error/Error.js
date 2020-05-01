import React from 'react';
import { View } from 'react-native';
import Image from 'react-native-fast-image';
import {
  Headline,
  Button,
  Caption
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';

export default inject('stores')(observer(
  ({ onRefresh, message, caption, loading, stores, notFound }) => (
    <View style={stores.appStyles.error.container}>
      {
        (stores.appState.isConnected && notFound) ? <Image resizeMode="contain" style={{ width: 200, height: 200 }} source={require('../../../assets/error-404.png')} /> : (
          <Image
            resizeMode="contain"
            style={{ width: 200, height: 200 }}
            source={stores.appState.isConnected ? require('../../../assets/server-woman.png') : require('../../../assets/nature-man.png')}
          /> 
        )
      }
      <Headline style={stores.appStyles.error.headline}>
        { (message) ? message : I18n.get(`ERROR_${stores.appState.isConnected ? 'somethingWentWrong' : 'offline'}`)}
      </Headline>
      { (caption) && <Caption>{caption}</Caption> }
      {
        (onRefresh && stores.appState.isConnected) && (
          <View style={stores.appStyles.error.content}>
            <Button
              icon={(props) => <Icon
                name="refresh-cw"
                size={16}
                color={props.color}
              />}
              onPress={onRefresh}
              mode="text"
              loading={loading}
            >
            { loading ? I18n.get("BUTTON_loading") : I18n.get("BUTTON_tryAgain") }
            </Button>
          </View>
        )
      }
    </View>
  )
));
