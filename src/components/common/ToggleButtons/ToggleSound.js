import React, { PureComponent } from 'react';
import { Switch } from 'react-native';
import {
  Left,
  Right,
  Text,
} from 'native-base';
import i18n from '../../../config/i18n';

export default class ToggleSound extends PureComponent {

  render() {
    const { sound, toggle } = this.props;
    return (
      <React.Fragment>
        <Left>
          <Text>{i18n.t('button.sound')}</Text>
        </Left>
        <Right>
          <Switch
            value={sound}
            onValueChange={toggle}
          />
        </Right>
      </React.Fragment>
    )
  }
}