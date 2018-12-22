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
  disableReminder,
  alarm,
  headsup,
  eventEnded,
  disablePush,
  adminComments,
  followersComments,
  visitorsComments,
  repliedComments
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
          title="Disable"
          right={() => (
            <Switch
              value={disableReminder}
              onValueChange={() => handleValueChange('disableReminder')}
            />
          )}
        />
        <Divider />
        <List.Item
          title="Remind me"
          right={() => <List.Icon icon="chevron-right" />}
          onPress={openRemindMeDialog}
        />
        <Divider />
        <List.Item
          title="Heads-up"
          right={() => (
            <Switch
              value={headsup}
              onValueChange={() => handleValueChange('headsup')}
            />
          )}
        />
        <Divider />
        <List.Item
          title="Starred alarm"
          description="Set alarm for starred events?"
          right={() => (
            <Switch
              value={alarm}
              onValueChange={() => handleValueChange('alarm')}
            />
          )}
        />
        <Divider />
        <List.Item
          title="Event ended"
          description="Get notified when an event end's?"
          right={() => (
            <Switch
              value={eventEnded}
              onValueChange={() => handleValueChange('eventEnded')}
            />
          )}
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
        <Divider />
        <List.Item
          title="Admin comments"
          right={() => (
            <Switch
              value={adminComments}
              onValueChange={() => handleValueChange('groupAdmin')}
            />
          )}
        />
        <Divider />
        <List.Item
          title="Group followers comments"
          right={() => (
            <Switch
              value={followersComments}
              onValueChange={() => handleValueChange('groupFollowers')}
            />
          )}
        />
        <Divider />
        <List.Item
          title="Visitors comments"
          right={() => (
            <Switch
              value={visitorsComments}
              onValueChange={() => handleValueChange('groupVisitors')}
            />
          )}
        />
        <Divider />
        <List.Item
          title="Replies to my comments"
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