import React from 'react';
import { View, TouchableOpacity } from 'react-native';
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
      <TouchableOpacity style={{
        borderRadius: size / 2,
        height: size,
        width: size,
        justifyContent: 'center',
        alignItems: 'center'
      }} onPress={onPress} style={style}>
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
      </TouchableOpacity>
    )
  }
}