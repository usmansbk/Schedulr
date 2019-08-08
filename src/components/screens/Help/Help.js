import React from 'react';
import { ScrollView } from 'react-native';
import { Appbar, List, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { inject, observer } from 'mobx-react';
import env from 'config/env';

export default inject('stores')(observer(
  (props) => (
    <>
      <Appbar style={props.stores.appStyles.styles.elevatedHeader} collapsable>
        <Appbar.Action
          onPress={props.goBack}
          icon={() => <Icon
            name="arrow-left"
            color={props.stores.themeStore.colors.gray}
            size={24}
          />}
        />
        <Appbar.Content
          title="Help"
          titleStyle={props.stores.appStyles.styles.headerColor}
        />
      </Appbar>
      <ScrollView style={props.stores.appStyles.styles.bg}>
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