import React from 'react';
import { TouchableRipple } from 'react-native-paper';
import UserAvatar from 'react-native-user-avatar';
import emojiRegex from 'emoji-regex';
import CachedImage from './CachedImage';

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
  shouldComponentUpdate = (nextProps) => this.props.name !== nextProps.name;

  _renderComponent = (props) => {
    const { size } = this.props;
    const { avatarName } = this.state;
    return <CachedImage {...props} size={size} name={avatarName} />
  };

  render() {
    const {
      src,
      onPress,
      size,
      style
    } = this.props;

    const { avatarName } = this.state;
  
    return (
      <TouchableRipple onPress={onPress} style={style}>
        <UserAvatar
          name={avatarName}
          src={src}
          size={size}
          component={this._renderComponent}
        />
      </TouchableRipple>
    )
  }
}