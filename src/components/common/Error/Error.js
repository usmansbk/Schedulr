import React from 'react';
import {
  View,
} from 'react-native';
import {
  Headline,
  Button
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';

export default inject('stores')(observer(
  ({ onRefresh, loading, stores }) => (
    <View style={stores.appStyles.error.container}>
      <Headline style={stores.appStyles.error.headline}>
        { I18n.get("ERROR_somethingWentWrong")}
      </Headline>
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
