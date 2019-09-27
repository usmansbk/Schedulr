import React from 'react';
import { ScrollView } from 'react-native';
import { Appbar, List, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import env from 'config/env';

export default inject('stores')(observer(
  (props) => (
    <>
      <Appbar.Header style={props.stores.appStyles.styles.header} collapsable>
        <Appbar.Action
          onPress={props.goBack}
          icon={() => <Icon
            name="arrow-left"
            color={props.stores.themeStore.colors.gray}
            size={24}
          />}
        />
        <Appbar.Content
          title={I18n.get("HELP_title")}
          titleStyle={props.stores.appStyles.styles.headerColor}
        />
      </Appbar.Header>
      <ScrollView style={props.stores.appStyles.styles.bg}>
        <List.Item
          title={I18n.get("HELP_contactUs")}
          description={I18n.get("HELP_contactUsSubtitle")}
          onPress={() => props.onPressItem('contact')}
        />
        <Divider />
        {
          false && <>
          <List.Item
            title={I18n.get("HELP_copyRight")}
            onPress={() => props.onPressItem('copyright')}
          />
          <Divider />
          <List.Item
            title={I18n.get("HELP_terms")}
            onPress={() => props.onPressItem('terms')}
          />
          <Divider />
          </>
        }
        <List.Item
          title={I18n.get("HELP_appVersion")}
          description={env.APP_VERSION}
        />
      </ScrollView>
    </>
  )
));