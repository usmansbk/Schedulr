import React from 'react';
import { View } from 'react-native';
import Image from 'react-native-fast-image';
import { TouchableRipple } from 'react-native-paper';
import UserAvatar from 'react-native-user-avatar';
import { getInitials } from 'lib/utils';

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
            name={getInitials(name)}
            size={size}
            style={{
              width: size,
              height: size,
            }}
            component={
              src ? (
                <Image
                  source={{uri: src}}
                  style={{
                    width: size + 1,
                    height: size + 1,
                    borderRadius: size / 2,
                  }}
                  defaultSource={require('../../../assets/placeholder.png')}
                />
              ) : undefined
            }
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