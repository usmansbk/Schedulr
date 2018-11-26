import React from 'react';
import { ScrollView } from 'react-native';
import { Appbar, List, Divider } from 'react-native-paper';
import styles from '../../../config/styles';
import colors from '../../../config/colors';

export default (props) => (
  <React.Fragment>
    <Appbar.Header style={styles.header} collapsable>
      <Appbar.BackAction color={colors.gray} onPress={props.goBack} />
      <Appbar.Content
        title="Help"
        titleStyle={styles.headerColor}
      />
    </Appbar.Header>
    <ScrollView>
      <List.Item
        title="FAQ"
      />
      <Divider />
      <List.Item
        title="Contact us"
        description="Questions? Need help"
      />
      <Divider />
      <List.Item
        title="Copyright information"
      />
      <Divider />
      <List.Item
        title="Terms and Privacy Policy"
      />
      <Divider />
      <List.Item
        title="App info"
      />
    </ScrollView>
  </React.Fragment>
);