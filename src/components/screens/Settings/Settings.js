import React from 'react';
import { ScrollView } from 'react-native';
import {
  Appbar,
  List,
  Switch,
  Divider
} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/Feather';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';

class Settings extends React.Component {
  static defaultProps = {
    stores: {}
  }

  handleValueChange = (value) => {
    this.props.stores.settingsStore.toggle(value)
  }

  toggleTheme = () => {
    this.props.stores.settingsStore.toggleTheme();
  }

  _handleRemindMeDialog = () => {
    const { openRemindMeDialog, stores } = this.props;
    if (stores.settingsStore.disableReminders) {
      SimpleToast.show(I18n.get("TOAST_enableReminder"), SimpleToast.SHORT);
    } else {
      openRemindMeDialog();
    }
  }

  render() {
    const {
      goBack,
      stores,
    } = this.props;
    const {
      dark,
      sound,
      vibrate,
      disableReminders,
      disablePushNotifications,
    } = stores.settingsStore;
    const { styles } = stores.appStyles;

    return (
      <>
        <Appbar style={styles.header} collapsable>
          <Appbar.Action
            onPress={goBack}
            icon={() => <Icon
              name="arrow-left"
              size={24}
              color={stores.themeStore.colors.gray}
            />}
          />
          <Appbar.Content
            title={I18n.get("SETTINGS_screenTitle")}
            titleStyle={styles.headerColor}
          />
        </Appbar>
        <ScrollView style={styles.bg}>
          <List.Section title={I18n.get("SETTINGS_generalSectionTitle")}>
            <List.Item
              title={I18n.get("SETTINGS_sound")}
              right={() => (
                <Switch
                  value={sound}
                  onValueChange={() => this.handleValueChange('sound')}
                />
              )}
            />
            <Divider />
            <List.Item
              title={I18n.get("SETTINGS_vibrate")}
              right={() => (
                <Switch
                  value={vibrate}
                  onValueChange={() => this.handleValueChange('vibrate')}
                />
              )}
            />
            <Divider />
            <List.Item
              title={I18n.get("SETTINGS_darkTheme")}
              right={() => (
                <Switch
                  value={dark}
                  onValueChange={this.toggleTheme}
                />
              )}
            />
            <Divider />
            <List.Item
              title={I18n.get("SETTINGS_location")}
              description={stores.appState.address}
            />
            <Divider />
          </List.Section>
          <List.Section title={I18n.get("SETTINGS_reminderSectionTitle")}>
            <List.Item
              title={I18n.get("SETTINGS_reminderDisable")}
              description={I18n.get("WARNING_dontMissOut")}
              right={() => (
                <Switch
                  value={disableReminders}
                  onValueChange={() => this.handleValueChange('disableReminders')}
                />
              )}
            />
            <Divider />
            <List.Item
              title={I18n.get("SETTINGS_remindMe")}
              right={() => <List.Icon
                icon={() => <Icon
                  name="chevron-right"
                  color={stores.themeStore.colors.gray}
                  size={24}
                />}
              />}
              onPress={this._handleRemindMeDialog}
            />
            <Divider />
          </List.Section>
          <List.Section title={I18n.get("SETTINGS_pushSectionTitle")}>
            <List.Item
              title={I18n.get("SETTINGS_pushDisable")}
              right={() => (
                <Switch
                  value={disablePushNotifications}
                  onValueChange={() => this.handleValueChange('disablePushNotifications')}
                />
              )}
            />
          </List.Section>
        </ScrollView>
      </>
    );
  }
}

export default inject("stores")(observer(Settings));