import React from 'react';
import numeral from 'numeral';
import {
  Text,
  IconButton
} from 'react-native-paper';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { inject, observer } from 'mobx-react';

class IconBagdeButton extends React.Component {
  _onPress = () => this.props.onPress();

  shouldComponentUpdate = nextProps => nextProps.count !== this.props.count;

  _renderIcon = () => <Icon name={this.props.icon} size={this.props.size} />
  
  render() {
    const {
      color,
      size,
      count,
      stores
    } = this.props;

    return  (
      <View style={stores.appStyles.styles.button}>
        <IconButton
          onPress={this._onPress}
          icon={this._renderIcon}
          size={size}
          color={color}
          style={stores.appStyles.styles.iconButton}
          animated
        />
        {
          Boolean(count) && (
            <Text style={stores.appStyles.styles.badge}>
              {count && numeral(count).format('0a')}
            </Text>
          )
        }
      </View>
    )
  }
}

export default inject("stores")(observer(IconBagdeButton));