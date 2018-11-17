import React, { Component } from 'react';
import {
  ListItem,
  Item,
  Text,
} from 'native-base';
import ToggleSound from './toggleSound';
import ToggleVibration from './toggleVibration';
import TogglePush from './togglePush';
import i18n from '../../../../config/i18n';
import styles from '../styles';

export default class PushSettings extends Component {
  render() {
    const { pushNotification } = this.props;
    return (
      <React.Fragment>
        <ListItem itemDivider>
          <Text>{i18n.t('label.push_notifications')}</Text>
        </ListItem>
        <Item style={styles.checkbox}>
          <ToggleSound sound={pushNotification.sound} />
        </Item>
        <Item style={styles.checkbox}>
          <ToggleVibration vibrate={pushNotification.vibrate} />
        </Item>
        <Item style={styles.checkbox}>
          <TogglePush push={pushNotification.push} />
        </Item>
      </React.Fragment>
    )
  }
}