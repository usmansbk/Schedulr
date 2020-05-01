import React from 'react';
import { View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import UserAvatar from './UserAvatar';

export default class Avatar extends React.Component {

  shouldComponentUpdate = (nextProps) => {
    return nextProps.src !== this.props.src ||
      nextProps.name !== this.props.name
  };

  render() {
    const {
      src,
      onPress,
      size=48,
      style,
      name,
      badge,
    } = this.props;
  
    return (
      <TouchableRipple onPress={onPress} style={style}>
        <View>
          <UserAvatar
            name={name}
            src={src}
            size={size}
          />
          <View style={{
            position: 'absolute',
            top: 1,
            right: 1
          }}>{badge}</View>
        </View>
      </TouchableRipple>
    )
  }
}