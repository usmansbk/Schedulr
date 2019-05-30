import React from 'react';
import numeral from 'numeral';
import {
  Text,
  IconButton
} from 'react-native-paper';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react/native';

@inject('stores')
@observer
export default class IconBagdeButton extends React.Component {
  _onPress = () => this.props.onPress();
  
  render() {
    const {
      color,
      icon,
      size,
      count,
      stores
    } = this.props;

    return  (
      <View style={stores.appStyles.styles.button}>
        <IconButton
          onPress={this._onPress}
          icon={icon}
          size={size}
          color={color}
          style={stores.appStyles.styles.iconButton}
          animated
        />
        {
          Boolean(count) && (
            <Text style={stores.appStyles.styles.badge}>{count && numeral(count).format('0a')}</Text>
          )
        }
      </View>
    )
  }
}
