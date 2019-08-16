import React from 'react';
import { TouchableRipple } from 'react-native-paper';
import UserAvatar from 'react-native-user-avatar';
import emojiRegex from 'emoji-regex';
import Image from './Image';

export default class Avatar extends React.Component {
  constructor(props) {
    super(props);
    const { name } = props;
    const emojiMatch = emojiRegex().exec(name);
    let avatarName;
    if (emojiMatch) {
      avatarName = emojiMatch[0];
    } else {
      const [ first, second ] = name.split(' ');
      avatarName = `${first} ${second ? second : ''}`;
    }
    this.state = {
      avatarName
    }
  }

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
      style
    } = this.props;

    const { avatarName } = this.state;
  
    return (
      <TouchableRipple onPress={onPress} style={style}>
        <UserAvatar
          name={avatarName}
          src={src}
          size={size}
          component={this._renderImageComponent}
        />
      </TouchableRipple>
    )
  }
}