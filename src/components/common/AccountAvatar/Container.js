import React from 'react';
import { withNavigation } from 'react-navigation';
import Avatar from './Avatar';

class AvatarContainer extends React.Component {
  render() {
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

const me = {
  id: 1,
  name: 'Babakolo Usman Suleiman',
  email: 'usmansbk@gmail.com',
  pictureUrl: null
};