import React from 'react';
import {
  View,
  TouchableNativeFeedback,
} from 'react-native';
import { Icon } from 'native-base';
import styles from './styles';
import theme from '../../theme';

export default class Button extends React.Component {
  shouldComponentUpdate = (nextProps) => {
    return this.props.disabled !== nextProps.disabled  ||
    this.props.name !== nextProps.name;
  }

  render() {
    const { type, name, onPress, disabled, color, customStyle } = this.props;
    let css = {};
    if (color) {
      if (color === 'primary') css.color = theme.backgroundColor;
      else if (color === 'black') css.color = theme.black;
    }

    return (
      <TouchableNativeFeedback
        disabled={disabled}
        accessible={true}
        accessibilityComponentType="button"
        accessibilityLabel={name}
        onPress={onPress}
        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
      >
        <View style={[styles.container, customStyle ]}>
          <Icon style={[styles.icon, {...css}]} name={name} type={ type || 'MaterialIcons'}/>
        </View>
      </TouchableNativeFeedback>
    )
  }
}
