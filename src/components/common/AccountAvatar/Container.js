import React from 'react';
import isEqual from 'lodash.isequal';
import { withNavigation } from 'react-navigation';
import Avatar from './Avatar';

class AvatarContainer extends React.Component {
  static defaultProps = {
    me: {
      id: -1,
      name: '...',
      email: '',
      pictureUrl: null
    }
  }

  shouldComponentUpdate = (nextProps) => !isEqual(nextProps.me, this.props.me);

  render() {
    const { me } = this.props;

    const {
      id,
      name,
      email,
      pictureUrl
    } = me;

    return (
      <Avatar
        name={name}
        email={email}
        pictureUrl={pictureUrl}
        onPress={() => (
          this.props.navigation.navigate('UserProfile', {
            id,
            privacy: 'private'
          })
        )}
      />
    );
  }
}

export default withNavigation(AvatarContainer);
