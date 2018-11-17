import React, { PureComponent } from 'react';
import { Switch } from 'react-native';
import {
  Left,
  Right,
  Text,
} from 'native-base';
import i18n from '../../../config/i18n';

export default class ToggleEnd extends PureComponent {

  render() {
    const { endReminder, toggle } = this.props;
    return (
      <React.Fragment>
        <Left>
          <Text>{i18n.t('button.event_ending')}</Text>
        </Left>
        <Right>
          <Switch
            value={endReminder}
            onValueChange={toggle}
          />
        </Right>
      </React.Fragment>
    )
  }
}