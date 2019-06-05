import React from 'react';
import { ScrollView } from 'react-native';
import { Appbar, List, Divider } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import env from 'config/env';

export default inject('stores')(observer(
  (props) => (
    <>
      <Appbar.Header style={props.stores.appStyles.styles.header} collapsable>
        <Appbar.BackAction color={props.stores.themeStore.colors.gray} onPress={props.goBack} />
        <Appbar.Content
          title="Help"
          titleStyle={props.stores.appStyles.styles.headerColor}
        />
      </Appbar.Header>
      <ScrollView style={props.stores.appStyles.styles.bg}>
        <List.Item
          title="FAQ"
          onPress={() => props.onPressItem('faq')}
        />
        <Divider />
        <List.Item
          title="Contact us"
          description="Questions? Need help"
          onPress={() => props.onPressItem('contact')}
        />
        <Divider />
        <List.Item
          title="Copyright information"
          onPress={() => props.onPressItem('copyright')}
        />
        <Divider />
        <List.Item
          title="Terms and Privacy Policy"
          onPress={() => props.onPressItem('terms')}
        />
        <Divider />
        <List.Item
          title="App version"
          description={env.APP_VERSION}
        />
      </ScrollView>
    </>
  )
));