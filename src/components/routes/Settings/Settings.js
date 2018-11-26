import React from 'react';
import { View } from 'react-native';
import { Appbar, List, Switch } from 'react-native-paper';
import styles from '../../../config/styles';
import colors from '../../../config/colors';


export default (props) => (
  <React.Fragment>
    <Appbar.Header style={styles.header} collapsable>
      <Appbar.BackAction color={colors.gray} onPress={props.goBack} />
      <Appbar.Content
        title="Settings"
        titleStyle={styles.headerColor}
      />
    </Appbar.Header>
    <View>
      <List.Section title="Reminders">
        <List.Item
          title="Mute"
          right={() => <Switch />}
        />
      </List.Section>
    </View>
  </React.Fragment>
);