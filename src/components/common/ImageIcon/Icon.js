import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import UserAvatar from 'components/common/UserAvatar';
import getImageUrl from 'helpers/getImageUrl';

export default class ImageIcon extends React.Component {
  render() {
    const { banner, color, size, name } = this.props;
    let component = null;

    if (banner) {
      const uri= getImageUrl(banner);
      component = (
        <UserAvatar
          size={30}
          src={uri}
          name={name}
        />
      );
    } else {
      component = (
        <Icon
          name={name}
          color={color}
          size={size}
        />
      );
    }
    return component;
  }
}