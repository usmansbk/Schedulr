import React from 'react';
import { Analytics } from 'aws-amplify';
import { AsyncStorage } from 'react-native';
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
      const userInfo = await AsyncStorage.getItem('loginInfo');
      this.setState(JSON.parse(userInfo));
    } catch (error) {
      Analytics.record({
        name: 'login_info_not_found',
        attributes: {
          name: error.name,
          message: error.message
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
