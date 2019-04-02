import React from 'react';
import { ScrollView } from 'react-native';
import { Appbar, List, Divider } from 'react-native-paper';
import env from 'config/env';
import styles from 'config/styles';
import colors from 'config/colors';

export default (props) => (
  <>
    <Appbar.Header style={styles.header} collapsable>
      <Appbar.BackAction color={colors.gray} onPress={props.goBack} />
      <Appbar.Content
        title="Help"
        titleStyle={styles.headerColor}
      />
    </Appbar.Header>
    <ScrollView style={styles.bg}>
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
);