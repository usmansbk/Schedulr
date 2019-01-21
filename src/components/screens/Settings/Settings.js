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
  playSound,
  vibrate,
  headsUp,
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
      <List.Section title="General">
        <List.Item
          title="Sound"
          right={() => (
            <Switch
              value={playSound}
              onValueChange={() => handleValueChange('playSound')}
            />
          )}
        />
        <Divider />
        <List.Item
          title="Vibrate"
          right={() => (
            <Switch
              value={vibrate}
              onValueChange={() => handleValueChange('vibrate')}
            />
          )}
        />
        <Divider />
      </List.Section>
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
          disabled={muteReminder}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={openRemindMeDialog}
        />
        <Divider />
        {
          false && (
            <React.Fragment>
            <List.Item
              title="Heads-up"
              right={() => (
                <Switch
                  disabled={muteReminder}
                  value={headsUp}
                  onValueChange={() => handleValueChange('headsUp')}
                />
              )}
            />
            <Divider />
            </React.Fragment>
          )
        }
        <List.Item
          title="Starred alarm"
          description="Play alarm sound?"
          right={() => (
            <Switch
              disabled={muteReminder}
              value={starredAlarm}
              onValueChange={() => handleValueChange('starredAlarm')}
            />
          )}
        />
      </List.Section>
      {
        false && (
          <List.Section title="Events and Boards Updates">
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