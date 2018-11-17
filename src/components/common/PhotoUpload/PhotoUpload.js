import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import UserAvatar from '../UserAvatar';

class PhotoUpload extends Component {
  shouldComponentUpdate = (nextProps) => {
    return this.props.logo !== nextProps.logo ||
      this.props.name !== nextProps.name ||
      this.props.id !== nextProps.id;
  }

  render() {
    const {
      id,
      name,
      logo,
      navigation
    } = this.props;

    return (
      <UserAvatar
        size={100}
        rounded
        name={name}
        src={logo}
        onPress={() => 
          navigation.navigate(
            'ImageViewer',
            {
              id, 
              name,
              action: 'group',
            })
        }
      />
    )
  }
}

export default withNavigation(PhotoUpload);