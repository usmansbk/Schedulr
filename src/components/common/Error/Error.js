import React from 'react';
import {
  View,
  Image
} from 'react-native';
import {
  Headline,
  Button,
  Caption
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';

export default inject('stores')(observer(
  ({ onRefresh, message, caption, loading, stores, icon }) => (
    <View style={stores.appStyles.error.container}>
      {
        icon && <Image resizeMode="contain" style={{ width: 200, height: 200 }} source={require('../../../assets/error-404.png')} />
      }
      <Headline style={stores.appStyles.error.headline}>
        { message ? message : I18n.get("ERROR_somethingWentWrong")}
      </Headline>
      {
        caption && <Caption>{caption}</Caption>
      }
      {
        onRefresh && (
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
