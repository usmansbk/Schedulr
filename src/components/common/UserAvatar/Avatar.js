import React from 'react';
import { View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import UserAvatar from 'react-native-user-avatar';
import { getInitials } from 'lib/utils';
import Image from './Image';

export default class Avatar extends React.Component {
  _renderImageComponent = () => <Image
    size={this.props.size}
    uri={this.props.src}
  />;

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
            src={src}
            size={size}
            component={this._renderImageComponent}
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