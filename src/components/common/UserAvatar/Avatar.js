import React from 'react';
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
      name
    } = this.props;

    const { avatarName } = this.state;
  
    return (
      <TouchableRipple onPress={onPress} style={style}>
        <UserAvatar
          name={getInitials(name)}
          src={src}
          size={size}
          component={this._renderImageComponent}
        />
      </TouchableRipple>
    )
  }
}