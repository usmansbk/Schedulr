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
  muteReminder,
  starredAlarm,
  headsUp,
  eventEnded,
  disablePush
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
              value={muteReminder}
              onValueChange={() => handleValueChange('muteReminder')}
            />
          )}
        />
        <Divider />
        <List.Item
          title="Remind me"
          right={() => <List.Icon icon="chevron-right" />}
          onPress={!muteReminder && openRemindMeDialog}
        />
        <Divider />
        <List.Item
          title="Heads-up"
          right={() => (
            <Switch
              value={!muteReminder && headsUp}
              onValueChange={() => handleValueChange('headsUp')}
            />
          )}
        />
        <Divider />
        <List.Item
          title="Starred alarm"
          description="Set alarm for starred events?"
          right={() => (
            <Switch
              value={!muteReminder && starredAlarm}
              onValueChange={() => handleValueChange('starredAlarm')}
            />
          )}
        />
        <Divider />
        <List.Item
          title="Event ended"
          description="Get notified when an event end's?"
          right={() => (
            <Switch
              value={!muteReminder && eventEnded}
              onValueChange={() => handleValueChange('eventEnded')}
            />
          )}
        />
        <Divider />
      </List.Section>
      {
        false && (
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
        )
      }
    </ScrollView>
  </React.Fragment>
);