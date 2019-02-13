import React from 'react';
import isEqual from 'lodash.isequal';
import Avatar from './Avatar';

export default class AvatarContainer extends React.Component {
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
            profile: true
          })
        )}
      />
    );
  }
}