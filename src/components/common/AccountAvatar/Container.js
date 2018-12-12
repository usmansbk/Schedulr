import React from 'react';
import { Analytics, Cache } from 'aws-amplify';
import { withNavigation } from 'react-navigation';
import Avatar from './Avatar';

class AvatarContainer extends React.Component {
  state = {
    id: '',
    email: '',
    name: '...',
    pictureUrl: '',
  };

  componentDidMount = async () => {
    try {
      const loginInfo = await Cache.getItem('loginInfo');
      this.setState(JSON.parse(loginInfo));
    } catch (error) {
      Analytics.record({
        name: 'login_info_not_found',
        attributes: {
          name: error.name,
          message: error.message,
          component: 'AccountAvatarContainer',
        }
      })
    }
  }

  render() {
    const {
      id,
      name,
      email,
      pictureUrl
    } = this.state;
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
