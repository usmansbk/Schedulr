import React from 'react';
import {
  TouchableNativeFeedback,
  View,
  Text,
} from 'react-native';
import { Icon } from 'native-base';
import numeral from 'numeral';
import styles from './styles';
import colors from '../../theme';

const FONT_SIZE = 22;

export default class Button extends React.Component {

  shouldComponentUpdate = (nextProps) => {
    return this.props.disabled !== nextProps.disabled ||
      this.props.name !== nextProps.name ||
      this.props.badge !== nextProps.badge ||
      this.props.isClicked !== nextProps.isClicked;
  }

  _onPress = () => {
    const { onPress } = this.props;
    return onPress && onPress();
  }

  render() {
    const {
      disabled,
      type,
      name,
      color,
      isClicked,
      badge,
      withBadge
    } = this.props;

    const clickedStyle = {
      color:  isClicked ? color : colors.gray,
      fontSize: FONT_SIZE,
      marginRight: 8,
    };

    const containerStyle =  {
      justifyContent: withBadge ? 'flex-start' : 'center',
      alignItems: 'center',
      flexDirection: 'row',
      width: 48,
      height: 48,
    };


    return (
      <TouchableNativeFeedback
        disabled={disabled}
        onPress={this._onPress}
        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
      >
        <View style={containerStyle}>
          <Icon fontSize={FONT_SIZE} style={clickedStyle} name={name} type={ type || 'MaterialIcons'}/>
          { Boolean(badge) && <Text style={[styles.icon]}>{numeral(badge).format('0a')}</Text> }
        </View>
      </TouchableNativeFeedback>
    )
  }
}