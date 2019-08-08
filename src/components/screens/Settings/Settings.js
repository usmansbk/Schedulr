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
      SimpleToast.show('Enable reminder!', SimpleToast.SHORT);
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
      headsUp,
      bookmarkedEventsOnly,
      disablePushNotifications,
    } = stores.settingsStore;
    const { styles } = stores.appStyles;
    const { colors } = stores.themeStore;

    return (
      <>
        <Appbar style={styles.elevatedHeader} collapsable>
          <Appbar.Action
            onPress={goBack}
            color={colors.gray}
            icon={() => <Icon
              name="arrow-left"
              color={colors.gray}
              size={24}
            />}
          />
          <Appbar.Content
            title="Settings"
            titleStyle={styles.headerColor}
          />
        </Appbar>
        <ScrollView style={styles.bg}>
          <List.Section title="General">
            <List.Item
              title="Sound"
              right={() => (
                <Switch
                  value={sound}
                  onValueChange={() => this.handleValueChange('sound')}
                />
              )}
            />
            <Divider />
            <List.Item
              title="Vibrate"
              right={() => (
                <Switch
                  value={vibrate}
                  onValueChange={() => this.handleValueChange('vibrate')}
                />
              )}
            />
            <Divider />
            <List.Item
              title="Dark theme"
              right={() => (
                <Switch
                  value={dark}
                  onValueChange={this.toggleTheme}
                />
              )}
            />
            <Divider />
            <List.Item
              title="Location"
              description={stores.appState.address}
            />
            <Divider />
          </List.Section>
          <List.Section title="Reminder">
            <List.Item
              title="Disable"
              right={() => (
                <Switch
                  value={disableReminders}
                  onValueChange={() => this.handleValueChange('disableReminders')}
                />
              )}
            />
            <Divider />
            {
              false && (
              <>
                <List.Item
                  title="Heads-up"
                  right={() => (
                    <Switch
                      value={headsUp}
                      onValueChange={() => this.handleValueChange('headsUp')}
                    />
                  )}
                />
                <Divider />
                <List.Item
                  title="Bookmark alarm"
                  right={() => (
                    <Switch
                      value={bookmarkedEventsOnly}
                      onValueChange={() => this.handleValueChange('bookmarkedEventsOnly')}
                    />
                  )}
                />
                <Divider />
              </>)
            }
            <List.Item
              title="Remind me"
              right={() => <List.Icon
                icon={() => <Icon
                  name="chevron-right"
                  color={colors.gray}
                  size={24}
                />}
              />}
              onPress={this._handleRemindMeDialog}
            />
            <Divider />
          </List.Section>
          <List.Section title="Push notification">
            <List.Item
              title="Disable"
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