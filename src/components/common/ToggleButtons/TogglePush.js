import React, { PureComponent } from 'react';
import { Switch } from 'react-native';
import {
  Left,
  Right,
  Text,
} from 'native-base';
import i18n from '../../../config/i18n';

export default class TogglePush extends PureComponent {

  render() {
    const { push, toggle } = this.props;
    return (
      <React.Fragment>
        <Left>
          <Text>{i18n.t('button.subscribe')}</Text>
        </Left>
        <Right>
          <Switch
            value={push}
            onValueChange={toggle}
          />
        </Right>
      </React.Fragment>
    )
  }
}