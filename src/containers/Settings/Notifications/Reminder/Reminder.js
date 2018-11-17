import React, { Component } from 'react';
import { ToastAndroid } from 'react-native';
import {
  ListItem,
  Item,
  Text,
} from 'native-base';
import ToggleSound from './toggleSound';
import ToggleVibration from './toggleVibration';
import ToggleEndReminder from './toogleEndReminder';
import ReminderModal from './ReminderModal';
import { updateReminders } from '../../../../lib/updateSettings';
import i18n from '../../../../config/i18n';
import styles from '../styles';

export default class ReminderSettings extends Component {
  state = {
    isVisible: false
  }

  handleClose = () => {
    this.setState({ isVisible: false, });
  }

  handleSave = () => {
    updateReminders();
    ToastAndroid.show(i18n.t('toast.refreshed'), ToastAndroid.SHORT);
  };

  _updateReminders = () => {
    ToastAndroid.show(i18n.t('toast.refreshed'), ToastAndroid.SHORT);
    updateReminders();
  }

  render() {
    const { reminder } = this.props;
    const { isVisible } = this.state;

    return (
      <React.Fragment>
        <ListItem itemDivider>
          <Text>{i18n.t('label.events_reminder')}</Text>
        </ListItem>
        <Item
          style={styles.checkbox}
          onPress={() => this.setState({ isVisible: true })}
        >
          <Text>{i18n.t('button.remind_me')}</Text>
        </Item>
        <Item style={styles.checkbox} onPress={this._updateReminders}>
          <Text>{i18n.t('button.refresh_reminders')}</Text>
        </Item>
        <Item style={styles.checkbox}>
          <ToggleEndReminder endReminder={reminder.endReminder} />
        </Item>
        <Item style={styles.checkbox}>
          <ToggleSound sound={reminder.sound} />
        </Item>
        <Item style={styles.checkbox}>
          <ToggleVibration vibrate={reminder.vibrate} />
        </Item>
        <ReminderModal
          isVisible={isVisible}
          handleClose={this.handleClose}
          before={reminder.before}
        />
      </React.Fragment>
    )
  }
}