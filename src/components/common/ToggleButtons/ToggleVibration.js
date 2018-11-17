import React, { PureComponent } from 'react';
import { Switch } from 'react-native';
import {
  Left,
  Right,
  Text,
} from 'native-base';
import i18n from '../../../config/i18n';

export default class ToggleVibration extends PureComponent {

  render() {
    const { vibrate, toggle } = this.props;
    return (
      <React.Fragment>
        <Left>
          <Text>{i18n.t('button.vibration')}</Text>
        </Left>
        <Right>
          <Switch
            value={vibrate}
            onValueChange={toggle}
          />
        </Right>
      </React.Fragment>
    )
  }
}