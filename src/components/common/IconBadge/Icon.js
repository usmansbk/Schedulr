import React from 'react';
import numeral from 'numeral';
import {Text, IconButton} from 'react-native-paper';
import {View} from 'react-native';
import Icon from 'components/common/Icon';
import {inject, observer} from 'mobx-react';

class IconBagdeButton extends React.Component {
  _onPress = () => this.props.onPress();

  shouldComponentUpdate = (nextProps) =>
    nextProps.count !== this.props.count ||
    nextProps.color !== this.props.color ||
    nextProps.disabled !== this.props.disabled;

  _renderIcon = () => (
    <Icon
      name={this.props.icon}
      size={this.props.size}
      color={this.props.color}
    />
  );

  render() {
    const {size, count, stores, color, disabled} = this.props;

    return (
      <View style={stores.styles.appStyles.button}>
        <IconButton
          onPress={this._onPress}
          icon={this._renderIcon}
          size={size}
          style={stores.styles.appStyles.iconButton}
          disabled={disabled}
        />
        {Boolean(count) && (
          <Text
            style={[
              stores.styles.appStyles.badge,
              {
                color,
              },
            ]}>
            {count && numeral(count).format('0a')}
          </Text>
        )}
      </View>
    );
  }
}

export default inject('stores')(observer(IconBagdeButton));
