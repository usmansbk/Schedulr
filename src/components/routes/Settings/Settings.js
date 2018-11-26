import React from 'react';
import { ScrollView } from 'react-native';
import {
  Appbar,
  List,
  Switch,
  Divider
} from 'react-native-paper';
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
    <ScrollView>
      <List.Section title="Reminders">
        <List.Item
          title="Mute"
          right={() => <Switch />}
        />
        <Divider />
        <List.Item
          title="Event ended"
          description="Get notified when an event end's"
          right={() => <Switch />}
        />
        <Divider />
        <List.Item
          title="Remind me before"
          right={() => <List.Icon icon="chevron-right" />}
        />
        <Divider />
      </List.Section>
      <List.Section title="Push Notifications">
        <List.Item
          title="Disable"
          right={() => <Switch />}
        />
      </List.Section>
      <List.Section title="Comments">
        <List.Item
          title="From group admin"
          right={() => <Switch />}
        />
        <Divider />
        <List.Item
          title="From group members"
          right={() => <Switch />}
        />
        <Divider />
        <List.Item
          title="From visitors"
          right={() => <Switch />}
        />
        <Divider />
        <List.Item
          title="Replies to your comments"
          right={() => <Switch />}
        />
      </List.Section>
    </ScrollView>
  </React.Fragment>
);