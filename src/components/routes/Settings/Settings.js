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


export default ({
  goBack,
  handleValueChange,
  openRemindMeDialog,
  muteReminders,
  eventEnded,
  disablePush,
  adminComments,
  membersComments,
  visitorsComments,
  repliedComments,
}) => (
  <React.Fragment>
    <Appbar.Header style={styles.header} collapsable>
      <Appbar.BackAction color={colors.gray} onPress={goBack} />
      <Appbar.Content
        title="Settings"
        titleStyle={styles.headerColor}
      />
    </Appbar.Header>
    <ScrollView>
      <List.Section title="Reminders">
        <List.Item
          title="Mute"
          right={() => (
            <Switch
              value={muteReminders}
              onValueChange={() => handleValueChange('muteReminder')}
            />
          )}
        />
        <Divider />
        <List.Item
          title="Event ended"
          description="Get notified when an event end's"
          right={() => (
            <Switch
              value={eventEnded}
              onValueChange={() => handleValueChange('eventEnded')}
            />
          )}
        />
        <Divider />
        <List.Item
          title="Remind me before"
          right={() => <List.Icon icon="chevron-right" />}
          onPress={openRemindMeDialog}
        />
        <Divider />
      </List.Section>
      <List.Section title="Push Notifications">
        <List.Item
          title="Disable"
          right={() => (
            <Switch
              value={disablePush}
              onValueChange={() => handleValueChange('disablePush')}
            />
          )}
        />
      </List.Section>
      <List.Section title="Comments">
        <List.Item
          title="From group admin"
          right={() => (
            <Switch
              value={adminComments}
              onValueChange={() => handleValueChange('groupAdmin')}
            />
          )}
        />
        <Divider />
        <List.Item
          title="From group members"
          right={() => (
            <Switch
              value={membersComments}
              onValueChange={() => handleValueChange('groupMembers')}
            />
          )}
        />
        <Divider />
        <List.Item
          title="From visitors"
          right={() => (
            <Switch
              value={visitorsComments}
              onValueChange={() => handleValueChange('groupVisitors')}
            />
          )}
        />
        <Divider />
        <List.Item
          title="Replies to your comments"
          right={() => (
            <Switch
              value={repliedComments}
              onValueChange={() => handleValueChange('repliedComments')}
            />
          )}
        />
      </List.Section>
    </ScrollView>
  </React.Fragment>
);