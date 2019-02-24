import React from 'react';
import { ScrollView } from 'react-native';
import {
  Appbar,
  List,
  Switch,
  Divider
} from 'react-native-paper';
import { inject } from 'mobx-react/native';
import styles from '../../../config/styles';
import colors from '../../../config/colors';

@inject("stores")
export default class Settings extends React.Component {
  static defaultProps = {
    state: {}
  }
  render() {
    const {
      goBack,
      handleValueChange,
      openRemindMeDialog,
      stores,
    } = this.props;
    const {
      sound,
      vibrate,
      disableReminders,
      headsUp,
      starredEventsOnly,
      disablePushNotifications,
    } = stores.settingsStore;

    return (
      <React.Fragment>
        <Appbar.Header style={styles.header} collapsable>
          <Appbar.BackAction color={colors.gray} onPress={goBack} />
          <Appbar.Content
            title="Settings"
            titleStyle={styles.headerColor}
          />
        </Appbar.Header>
        <ScrollView style={styles.bg}>
          <List.Section title="General">
            <List.Item
              title="Sound"
              right={() => (
                <Switch
                  value={sound}
                  onValueChange={() => handleValueChange('sound')}
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
              title="Disable"
              right={() => (
                <Switch
                  value={disableReminders}
                  onValueChange={() => handleValueChange('disableReminders')}
                />
              )}
            />
            <Divider />
            <List.Item
              title="Heads-up"
              right={() => (
                <Switch
                  disabled={true}
                  value={headsUp}
                  onValueChange={() => handleValueChange('headsUp')}
                />
              )}
            />
            <Divider />
            <List.Item
              title="Starred events only"
              right={() => (
                <Switch
                  disabled={starredEventsOnly}
                  value={starredEventsOnly}
                  onValueChange={() => handleValueChange('starredEventsAlarm')}
                />
              )}
            />
            <Divider />
            <List.Item
              title="Remind me"
              disabled={disableReminders}
              right={() => <List.Icon icon="chevron-right" />}
              onPress={openRemindMeDialog}
            />
            <Divider />
          </List.Section>
          <List.Section title="Push notifications">
            <List.Item
              title="Disable"
              right={() => (
                <Switch
                  disabled={true}
                  value={disablePushNotifications}
                  onValueChange={() => handleValueChange('disablePushNotifications')}
                />
              )}
            />
          </List.Section>
        </ScrollView>
      </React.Fragment>
    );
  }
}